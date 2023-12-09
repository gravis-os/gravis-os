import React from 'react'

import {
  PaginatedQueryViewVariantEnum,
  UseFilterDefsReturn,
  UseSortDefsReturn,
} from '@gravis-os/query'
import {
  AppBar,
  Button,
  Chip,
  Container,
  HeaderButtonWithMenu,
  Stack,
  Typography,
} from '@gravis-os/ui'
import CancelIcon from '@mui/icons-material/Cancel'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import { ToggleButton, ToggleButtonGroup, Toolbar } from '@mui/material'

export interface FilterAppBarProps {
  directoryVariant: PaginatedQueryViewVariantEnum
  disableGridOption?: boolean
  disableListOption?: boolean
  setDirectoryVariant: React.Dispatch<
    React.SetStateAction<PaginatedQueryViewVariantEnum>
  >
  setShowMap?: React.Dispatch<React.SetStateAction<boolean>>
  showMap?: boolean
  subtitle?: string
  title?: string
  useFilterDefsProps?: UseFilterDefsReturn
  useSortDefsProps?: UseSortDefsReturn
}

const FilterAppBar: React.FC<FilterAppBarProps> = (props) => {
  const {
    title,
    directoryVariant,
    disableGridOption,
    disableListOption,
    setDirectoryVariant,
    setShowMap,
    showMap,
    subtitle,
    useFilterDefsProps,
    useSortDefsProps,
  } = props

  const {
    filterChips,
    handleDeleteFilterChip,
    handleToggleIsFilterDrawerOpen,
    isFilterDrawerOpen,
  } = useFilterDefsProps

  const { currentSortDef, handleSortDefClick, sortDefs } = useSortDefsProps

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
      <Container disableGutters maxWidth={false}>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
          }}
          variant="dense"
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={0.5}
            sx={{ width: 'initial' }}
          >
            {title && <Typography variant="h5">{title}</Typography>}
            {subtitle && (
              <Typography color="text.secondary" variant="body1">
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
                justifyContent: 'flex-start',
                ml: 2,
                width: 'initial',
              }}
            >
              {filterChips?.map((filterChip) => {
                const { key, label } = filterChip
                return (
                  <Chip
                    color="secondary"
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
                    key={key}
                    label={label}
                    onDelete={() => handleDeleteFilterChip(filterChip)}
                    size="small"
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
              alignItems="center"
              direction="row"
              spacing={1}
              sx={{
                '& > *': { flexShrink: 0 },
              }}
            >
              {/* Filter */}
              <Button
                color="inherit"
                onClick={() => handleToggleIsFilterDrawerOpen()}
                startIcon={<TuneOutlinedIcon />}
              >
                {isFilterDrawerOpen ? 'Hide' : 'Show'} Filters
              </Button>

              {/* Sort */}
              <HeaderButtonWithMenu
                disableBackdrop
                items={sortDefs.map((sortDef) => ({
                  ...sortDef,
                  onClick: () => handleSortDefClick(sortDef),
                }))}
                key="sort-by"
                popperProps={{ placement: 'auto-end' }}
                title={
                  currentSortDef
                    ? `Sort By: ${currentSortDef.label}`
                    : 'Sort By'
                }
              />

              {/* View */}
              <ToggleButtonGroup
                exclusive
                onChange={(e, value) => setDirectoryVariant(value)}
                size="small"
                value={directoryVariant}
              >
                <ToggleButton
                  disabled={disableGridOption}
                  value={PaginatedQueryViewVariantEnum.Grid}
                >
                  <GridViewOutlinedIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton
                  disabled={disableListOption}
                  value={PaginatedQueryViewVariantEnum.List}
                >
                  <FormatListBulletedOutlinedIcon fontSize="small" />
                </ToggleButton>
              </ToggleButtonGroup>

              {typeof showMap === 'boolean' && setShowMap && (
                <Button
                  color="inherit"
                  onClick={() => setShowMap(!showMap)}
                  startIcon={<MapOutlinedIcon fontSize="small" />}
                  sx={{ display: { xs: 'none', md: 'inline-flex' } }}
                >
                  {showMap ? 'Hide' : 'Show'} Map
                </Button>
              )}
            </Stack>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default FilterAppBar
