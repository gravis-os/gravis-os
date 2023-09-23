import React, { useState } from 'react'

import { FormSectionsProps, getRelationalObjectKey } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import {
  Box,
  Button,
  ChipStack,
  ChipStackProps,
  Drawer,
  Paper,
  Stack,
  Typography,
} from '@gravis-os/ui'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import { ButtonProps } from '@mui/material'
import assign from 'lodash/assign'
import get from 'lodash/get'

import styleConfig from '../config/styleConfig'
import getFieldDefsFromSections from '../utils/getFieldDefsFromSections'
import CrudAddDialog from './CrudAddDialog'
import CrudUploadDialog, {
  CrudUploadDialogProps,
} from './CrudUploadDialog/CrudUploadDialog'
import FilterForm, { FilterFormProps } from './FilterForm'
import getChipsFromFilters from './getChipsFromFilters'
import SearchForm, { SearchFormProps } from './SearchForm'
import useAddDialog from './useAddDialog'

export interface CrudTableHeaderProps {
  actionButtons?: ButtonProps[]
  actions?: React.ReactNode | React.ReactNode[]
  addDialogProps?: Record<string, unknown>
  addFormSections?: FormSectionsProps['sections']
  addModule?: CrudModule
  batchUpdateActions?: React.ReactNode | React.ReactNode[]
  disableAdd?: boolean
  disableChips?: boolean
  disableReset?: boolean
  disableUpload?: boolean
  filterFormProps?: Partial<FilterFormProps>
  filterFormSections?: FormSectionsProps['sections']
  filters: Record<string, unknown>
  getUploadValues?: (rows: unknown) => unknown
  manyToManyKeys?: string[]
  module: CrudModule
  renderAddButton?: (buttonProps: ButtonProps) => React.ReactElement
  searchFormProps?: Partial<SearchFormProps>
  searchFormSections?: FormSectionsProps['sections']
  setFilters: React.Dispatch<
    React.SetStateAction<Record<string, unknown> | any[]>
  >
  uploadDialogProps?: Omit<CrudUploadDialogProps, 'module'>
  uploadFields?: string[]
}

const CrudTableHeader: React.FC<CrudTableHeaderProps> = (props) => {
  const {
    actionButtons,
    actions,
    addDialogProps,
    addFormSections = [],
    addModule,
    batchUpdateActions,
    disableAdd,
    disableChips,
    disableReset,
    disableUpload,
    filterFormProps = {},
    filterFormSections = [],
    filters,
    getUploadValues,
    manyToManyKeys,
    module,
    renderAddButton,
    searchFormProps = {},
    searchFormSections = [],
    setFilters,
    uploadDialogProps,
    uploadFields,
  } = props
  const { name, route } = module

  const hasFilterFormSections = Boolean(filterFormSections?.length)
  const hasSearchFormSections = Boolean(searchFormSections?.length)
  const hasAddFormSections = Boolean(addFormSections?.length)

  const filterAndSearchFormFieldDefs = {
    ...getFieldDefsFromSections(filterFormSections),
    ...getFieldDefsFromSections(searchFormSections),
  }

  // Filter Drawer
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)

  // Add Dialog
  const useAddDialogProps = useAddDialog({ addFormSections, module: addModule })
  const { setAddDialogOpen } = useAddDialogProps

  // Methods
  /**
   * Submit the search + filter field values by setting it as a query param
   * @param values
   */
  const handleSubmit = ({ values }) => {
    // Submit the search + filter form here
    const appliedFilters = { ...filters, ...values }

    // Scan through the appliedFilters to apply any operator to the value
    const nextFilters = Object.entries(appliedFilters).reduce(
      (acc, [key, value]) => {
        const fieldDef = get(filterAndSearchFormFieldDefs, key)
        // allow custom formatting
        if (fieldDef?.setFilterQuery) {
          const [formattedKey, formattedValue] = fieldDef.setFilterQuery([
            key,
            value,
          ])

          const nextFilters = {
            ...acc,
            [formattedKey]: formattedValue,
            ...(typeof value !== 'object' && { [key]: value }),
          }

          if (key.endsWith('_id')) {
            const relationalObjectKey = getRelationalObjectKey(key, false)
            assign(nextFilters, {
              [relationalObjectKey]: get(appliedFilters, relationalObjectKey),
            })
          }

          return nextFilters
        }

        if (typeof value === 'object') return acc

        // Get the operator and apply op to the filters by scanning through the defs
        const op = fieldDef?.op
        const hasOp = Boolean(op)

        // Remove nested values as they interfere with the get() later
        const appliedFiltersWithoutEmptyValue = Object.entries(
          appliedFilters
        ).reduce((acc, [key, value]) => {
          // Filter out values that are empty string
          if (value === '') return acc
          return { ...acc, [key]: value }
        }, {})

        // If value is empty, fetch from object instead
        const resolvedValue =
          value === '' ? get(appliedFiltersWithoutEmptyValue, key) : value

        // Set the resolved value with the operator
        const nextValue = hasOp ? `${op}.${resolvedValue}` : resolvedValue

        // if this is a relational key, we want to include
        // the relational object too for filter chip to display
        // the correct label
        if (key.endsWith('_id')) {
          const relationalObjectKey = getRelationalObjectKey(key, false)
          return {
            ...acc,
            [key]: nextValue,
            [relationalObjectKey]: get(
              appliedFiltersWithoutEmptyValue,
              relationalObjectKey
            ),
          }
        }

        return { ...acc, [key]: nextValue }
      },
      {}
    )

    // Set state
    setFilters(nextFilters)
    setOpenFilterDrawer(false)
  }
  const handleReset = () => setFilters({})

  // Chips
  const chips = getChipsFromFilters({
    fieldDefs: filterAndSearchFormFieldDefs,
    filters,
    setFilters,
  }) as ChipStackProps['items']
  const hasChips = chips && chips?.length > 0
  const hasBatchUpdateActions = Array.isArray(batchUpdateActions)
    ? batchUpdateActions.length > 0
    : Boolean(batchUpdateActions)

  return (
    <>
      {/* First Row */}
      <Stack
        alignItems="center"
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={hasSearchFormSections ? 'space-between' : 'flex-end'}
        spacing={1}
        sx={{ mb: 2 }}
      >
        {/* Search */}
        {hasSearchFormSections && (
          <Box
            sx={{
              maxWidth: { xs: '100%', md: styleConfig.searchWidth },
              width: '100%',
            }}
          >
            <SearchForm
              module={module}
              onSubmit={handleSubmit}
              sections={searchFormSections as FormSectionsProps['sections']}
              {...searchFormProps}
            />
          </Box>
        )}

        {/* Right */}
        <Stack
          alignItems="center"
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="flex-end"
          spacing={1}
          sx={{ width: { xs: 'inherit', md: 'fit-content' } }}
          width={1}
        >
          {actions}

          {actionButtons?.map((actionButton) => (
            <Button key={actionButton.key} {...actionButton} />
          ))}

          {/* Filter Button */}
          {hasFilterFormSections && (
            <Stack
              alignItems="center"
              direction="row"
              spacing={1}
              sx={{ width: { xs: '100%', md: 'initial' } }}
            >
              {/* Reset */}
              {hasChips && !disableReset && (
                <Button onClick={handleReset}>Reset</Button>
              )}

              {/* Filters */}
              {hasFilterFormSections && (
                <>
                  <Button
                    fullWidthOnMobile
                    onClick={() => setOpenFilterDrawer(!openFilterDrawer)}
                    startIcon={<FilterListOutlinedIcon />}
                    variant="outlined"
                  >
                    Filters
                  </Button>
                  <Drawer
                    PaperProps={{
                      sx: {
                        boxShadow: styleConfig.rightAsideBoxShadow,
                        maxWidth: styleConfig.rightAsideWidth,
                        width: '100%',
                      },
                    }}
                    anchor="right"
                    onClose={() => setOpenFilterDrawer(false)}
                    open={openFilterDrawer}
                  >
                    <FilterForm
                      fieldDefs={filterAndSearchFormFieldDefs}
                      item={filters}
                      module={module}
                      onSubmit={handleSubmit}
                      sections={
                        filterFormSections as FormSectionsProps['sections']
                      }
                      {...filterFormProps}
                    />
                    <Box sx={{ mt: 1, mx: 2 }}>
                      <Button
                        fullWidth
                        onClick={() => setOpenFilterDrawer(!openFilterDrawer)}
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Drawer>
                </>
              )}
            </Stack>
          )}

          {/* Upload Button */}
          {!disableUpload && (
            <CrudUploadDialog
              getUploadValues={getUploadValues}
              manyToManyKeys={manyToManyKeys}
              module={module}
              uploadFields={uploadFields}
              {...uploadDialogProps}
            />
          )}

          {/* Add Button */}
          {!disableAdd &&
            (renderAddButton?.({ onClick: () => setAddDialogOpen(true) }) || (
              <Button
                fullWidthOnMobile
                startIcon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
                variant="contained"
                {...(hasAddFormSections
                  ? { onClick: () => setAddDialogOpen(true) }
                  : { href: `${route.plural}/new` })}
              >
                Add {name.singular}
              </Button>
            ))}

          {/* Add Dialog */}
          <CrudAddDialog {...useAddDialogProps} {...addDialogProps} />
        </Stack>
      </Stack>

      {/* Second Row */}
      {hasChips && !disableChips && (
        <Paper square sx={{ p: 2 }}>
          <Stack alignItems="center" direction="row" spacing={1}>
            <Typography variant="overline">Filters:</Typography>
            {/* Chips */}
            <ChipStack items={chips} />
          </Stack>
        </Paper>
      )}

      {/* Third Row */}
      {hasBatchUpdateActions && Array.isArray(batchUpdateActions)
        ? batchUpdateActions.map((action) => action)
        : batchUpdateActions}
    </>
  )
}

export default CrudTableHeader
