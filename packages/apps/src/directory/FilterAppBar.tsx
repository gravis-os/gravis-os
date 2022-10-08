import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import {
  AppBar,
  Button,
  Chip,
  Container,
  Stack,
  HeaderButtonWithMenu,
  Typography,
} from '@gravis-os/ui'
import { Toolbar } from '@mui/material'
import { UseFilterDefsReturn } from './useFilterDefs'
import { UseSortDefsReturn } from './useSortDefs'

export interface FilterAppBarProps {
  useFilterDefsProps?: UseFilterDefsReturn
  useSortDefsProps?: UseSortDefsReturn
  title?: string
  subtitle?: string
}

const FilterAppBar: React.FC<FilterAppBarProps> = (props) => {
  const { title, subtitle, useFilterDefsProps, useSortDefsProps } = props

  const {
    isFilterDrawerOpen,
    handleToggleIsFilterDrawerOpen,
    filterChips,
    handleDeleteFilterChip,
  } = useFilterDefsProps

  const { currentSortDef, sortDefs, handleSortDefClick } = useSortDefsProps

  return (
    <AppBar
      color="default"
      sx={{
        backgroundColor: 'background.paper',
        boxShadow: 1,
        position: 'sticky',
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar - 1,
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Toolbar
          variant="dense"
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{ width: 'initial' }}
          >
            {title && <Typography variant="h5">{title}</Typography>}
            {subtitle && (
              <Typography variant="body1" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Stack>

          {/* Filter Chips */}
          {Boolean(filterChips?.length) && (
            <Stack
              direction="row"
              spacing={1}
              sx={{
                flexGrow: 1,
                width: 'initial',
                ml: 2,
                justifyContent: 'flex-start',
              }}
            >
              {filterChips?.map((filterChip) => {
                const { key, label } = filterChip
                return (
                  <Chip
                    size="small"
                    key={key}
                    label={label}
                    onDelete={() => handleDeleteFilterChip(filterChip)}
                    deleteIcon={
                      <CancelIcon
                        sx={{
                          '&&': {
                            color: 'primary.main',
                            fontSize: 'body1.fontSize',
                          },
                        }}
                      />
                    }
                    color="secondary"
                    sx={{
                      backgroundColor: 'secondary.light',
                      color: 'primary.main',
                    }}
                  />
                )
              })}
            </Stack>
          )}

          {/* Filter + Sort */}
          <div>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                '& > *': { flexShrink: 0 },
              }}
            >
              {/* Filter */}
              <Button
                color="inherit"
                startIcon={<TuneOutlinedIcon />}
                onClick={() => handleToggleIsFilterDrawerOpen()}
              >
                {isFilterDrawerOpen ? 'Hide' : 'Show'} Filters
              </Button>

              {/* Sort */}
              <HeaderButtonWithMenu
                key="sort-by"
                title={
                  currentSortDef
                    ? `Sort By: ${currentSortDef.label}`
                    : 'Sort By'
                }
                disableBackdrop
                popperProps={{ placement: 'auto-end' }}
                items={sortDefs.map((sortDef) => ({
                  ...sortDef,
                  onClick: () => handleSortDefClick(sortDef),
                }))}
              />
            </Stack>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default FilterAppBar
