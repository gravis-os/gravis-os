import React, { useState } from 'react'
import get from 'lodash/get'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import {
  Button,
  Box,
  Drawer,
  Stack,
  Paper,
  Typography,
  ChipStack,
  ChipStackProps,
} from '@gravis-os/ui'
import { FormSectionsProps, getRelationalObjectKey } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import { ButtonProps } from '@mui/material'
import assign from 'lodash/assign'
import styleConfig from '../config/styleConfig'
import FilterForm, { FilterFormProps } from './FilterForm'
import SearchForm, { SearchFormProps } from './SearchForm'
import getChipsFromFilters from './getChipsFromFilters'
import useAddDialog from './useAddDialog'
import CrudAddDialog from './CrudAddDialog'
import CrudUploadDialog, {
  CrudUploadDialogProps,
} from './CrudUploadDialog/CrudUploadDialog'
import getFieldDefsFromSections from '../utils/getFieldDefsFromSections'

export interface CrudTableHeaderProps {
  actions?: React.ReactNode | React.ReactNode[]
  actionButtons?: ButtonProps[]
  module: CrudModule
  disableAdd?: boolean
  disableChips?: boolean
  addModule?: CrudModule
  filterFormSections?: FormSectionsProps['sections']
  searchFormSections?: FormSectionsProps['sections']
  addFormSections?: FormSectionsProps['sections']
  filters: Record<string, unknown>
  setFilters: React.Dispatch<
    React.SetStateAction<any[] | Record<string, unknown>>
  >
  addDialogProps?: Record<string, unknown>
  uploadDialogProps?: Omit<CrudUploadDialogProps, 'module'>
  renderAddButton?: (buttonProps: ButtonProps) => React.ReactElement
  disableReset?: boolean
  disableUpload?: boolean
  uploadFields?: string[]
  manyToManyKeys?: string[]
  getUploadValues?: (rows: unknown) => unknown
  filterFormProps?: Partial<FilterFormProps>
  searchFormProps?: Partial<SearchFormProps>
}

const CrudTableHeader: React.FC<CrudTableHeaderProps> = (props) => {
  const {
    actions,
    actionButtons,
    filters,
    setFilters,
    module,
    disableUpload,
    uploadFields,
    manyToManyKeys,
    getUploadValues,
    disableAdd,
    disableChips,
    addModule = module,
    addDialogProps,
    uploadDialogProps,
    addFormSections = [],
    searchFormSections = [],
    filterFormSections = [],
    renderAddButton,
    disableReset,
    filterFormProps = {},
    searchFormProps = {},
  } = props
  const { route, name } = module

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
  const useAddDialogProps = useAddDialog({ module: addModule, addFormSections })
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
            ...(typeof value !== 'object' && { [key]: value })
          }

          if (key.endsWith('_id')) {
            const relationalObjectKey = getRelationalObjectKey(key, false)
            assign(nextFilters, {
              [relationalObjectKey]: get(appliedFilters, relationalObjectKey)
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
            )
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
    filters,
    setFilters,
    fieldDefs: filterAndSearchFormFieldDefs,
  }) as ChipStackProps['items']
  const hasChips = chips && chips?.length > 0

  return (
    <>
      {/* First Row */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        spacing={1}
        justifyContent={hasSearchFormSections ? 'space-between' : 'flex-end'}
        sx={{ mb: 2 }}
      >
        {/* Search */}
        {hasSearchFormSections && (
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', md: styleConfig.searchWidth },
            }}
          >
            <SearchForm
              module={module}
              sections={searchFormSections as FormSectionsProps['sections']}
              onSubmit={handleSubmit}
              {...searchFormProps}
            />
          </Box>
        )}

        {/* Right */}
        <Stack
          width={1}
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="flex-end"
          spacing={1}
          sx={{ width: { xs: 'inherit', md: 'fit-content' } }}
        >
          {actions}

          {actionButtons?.map((actionButton) => (
            <Button key={actionButton.key} {...actionButton} />
          ))}

          {/* Filter Button */}
          {hasFilterFormSections && (
            <Stack
              sx={{ width: { xs: '100%', md: 'initial' } }}
              direction="row"
              alignItems="center"
              spacing={1}
            >
              {/* Reset */}
              {hasChips && !disableReset && (
                <Button onClick={handleReset}>Reset</Button>
              )}

              {/* Filters */}
              {hasFilterFormSections && (
                <>
                  <Button
                    onClick={() => setOpenFilterDrawer(!openFilterDrawer)}
                    variant="outlined"
                    startIcon={<FilterListOutlinedIcon />}
                    fullWidthOnMobile
                  >
                    Filters
                  </Button>
                  <Drawer
                    anchor="right"
                    open={openFilterDrawer}
                    onClose={() => setOpenFilterDrawer(false)}
                    PaperProps={{
                      sx: {
                        width: '100%',
                        maxWidth: styleConfig.rightAsideWidth,
                        boxShadow: styleConfig.rightAsideBoxShadow,
                      },
                    }}
                  >
                    <FilterForm
                      item={filters}
                      module={module}
                      sections={
                        filterFormSections as FormSectionsProps['sections']
                      }
                      onSubmit={handleSubmit}
                      fieldDefs={filterAndSearchFormFieldDefs}
                      {...filterFormProps}
                    />
                    <Box sx={{ mx: 2, mt: 1 }}>
                      <Button
                        onClick={() => setOpenFilterDrawer(!openFilterDrawer)}
                        variant="outlined"
                        fullWidth
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
              module={module}
              uploadFields={uploadFields}
              manyToManyKeys={manyToManyKeys}
              getUploadValues={getUploadValues}
              {...uploadDialogProps}
            />
          )}

          {/* Add Button */}
          {!disableAdd &&
            (renderAddButton?.({ onClick: () => setAddDialogOpen(true) }) || (
              <Button
                startIcon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
                variant="contained"
                fullWidthOnMobile
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
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="overline">Filters:</Typography>
            {/* Chips */}
            <ChipStack items={chips} />
          </Stack>
        </Paper>
      )}
    </>
  )
}

export default CrudTableHeader
