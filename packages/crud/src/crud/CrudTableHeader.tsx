import React, { useState } from 'react'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import dynamic from 'next/dynamic'
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
import { FormSectionsProps } from '@gravis-os/form'
import styleConfig from '../config/styleConfig'
import FilterForm from './FilterForm'
import { CrudModule } from './typings'
import SearchForm from './SearchForm'
import getChipsFromFilters from './getChipsFromFilters'
import useAddDialog from './useAddDialog'

const CrudAddDialog = dynamic(() => import('./CrudAddDialog'))

export interface CrudTableHeaderProps {
  module: CrudModule
  filterFormSections?: FormSectionsProps['sections']
  searchFormSections?: FormSectionsProps['sections']
  addFormSections?: FormSectionsProps['sections']
  filters: Record<string, unknown>
  setFilters: React.Dispatch<React.SetStateAction<any[] | {}>>
  addDialogProps?: Record<string, unknown>
}

const CrudTableHeader: React.FC<CrudTableHeaderProps> = props => {
  const {
    filters,
    setFilters,
    module,
    addDialogProps,
    addFormSections = [],
    searchFormSections = [],
    filterFormSections = [],
  } = props
  const { route, name } = module

  const hasFilterFormSections = Boolean(filterFormSections?.length)
  const hasSearchFormSections = Boolean(searchFormSections?.length)
  const hasAddFormSections = Boolean(addFormSections?.length)

  // Filter Drawer
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)

  // Add Dialog
  const useAddDialogProps = useAddDialog({ module, addFormSections })
  const { setAddDialogOpen } = useAddDialogProps

  // Methods
  const handleSubmit = ({ values }) => {
    setFilters({ ...filters, ...values })
    setOpenFilterDrawer(false)
  }
  const handleReset = () => setFilters({})

  // Chips
  const chips = getChipsFromFilters({
    filters,
    setFilters,
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
          <Box width={{ xs: '100%', md: styleConfig.searchWidth }}>
            <SearchForm
              module={module}
              sections={searchFormSections as FormSectionsProps['sections']}
              onSubmit={handleSubmit}
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
        >
          {/* Filter Button */}
          {hasFilterFormSections && (
            <Stack
              width={{ xs: '100%', md: 'initial' }}
              direction="row"
              alignItems="center"
              spacing={1}
            >
              {/* Reset */}
              {hasChips && <Button onClick={handleReset}>Reset</Button>}

              {/* Filters */}
              {hasFilterFormSections && (
                <>
                  <Button
                    onClick={() => setOpenFilterDrawer(!openFilterDrawer)}
                    variant="outlined"
                    startIcon={<FilterListOutlinedIcon />}
                    fullWidthMobile
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

          {/* Add Button */}
          <Button
            startIcon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
            variant="contained"
            fullWidthMobile
            {...(hasAddFormSections
              ? { onClick: () => setAddDialogOpen(true) }
              : { href: `/${route.plural}/new` })}
          >
            Add {name.singular}
          </Button>

          {/* Add Dialog */}
          <CrudAddDialog {...useAddDialogProps} {...addDialogProps} />
        </Stack>
      </Stack>

      {/* Second Row */}
      {hasChips && (
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
