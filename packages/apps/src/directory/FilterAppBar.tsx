import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import ListIcon from '@mui/icons-material/List'
import {
  AppBar,
  Button,
  Chip,
  Container,
  Stack,
  HeaderButtonWithMenu,
} from '@gravis-os/ui'
import { Toolbar } from '@mui/material'
import { UseFilterDefsReturn } from './useFilterDefs'

export interface FilterAppBarProps {
  useFilterDefsProps?: UseFilterDefsReturn
}

const FilterAppBar: React.FC<FilterAppBarProps> = (props) => {
  const { useFilterDefsProps } = props

  const {
    handleToggleIsFilterDrawerOpen,
    filterChips,
    handleDeleteFilterChip,
  } = useFilterDefsProps

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
        <Toolbar variant="dense">
          {/* Filter Menu Toggle */}
          <Stack direction="row" alignItems="center" sx={{ mr: 2 }}>
            <Button
              color="inherit"
              startIcon={<ListIcon />}
              onClick={() => handleToggleIsFilterDrawerOpen()}
            >
              Filters
            </Button>
          </Stack>

          {/* Filter Chips */}
          <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
            {filterChips?.map((filterChip) => {
              const { key, label } = filterChip
              return (
                <Chip
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

          {/* Sort */}
          <HeaderButtonWithMenu
            sx={{ flex: 'none' }}
            disableBackdrop
            key="sort-by"
            title="Sort by"
            items={[
              {
                title: 'Most Popular',
              },
              {
                title: 'Price: Lowest to Highest',
              },
              {
                title: 'Price: Highest to Lowest',
              },
            ]}
          />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default FilterAppBar
