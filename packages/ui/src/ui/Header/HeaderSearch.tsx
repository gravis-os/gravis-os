import React from 'react'
import { Box, BoxProps, InputAdornment, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { alpha } from '@mui/material/styles'

type HeaderSearchOnSearchFunction = (searchValue: string) => void

export interface HeaderSearchProps extends BoxProps {
  onSearch: HeaderSearchOnSearchFunction
  fullWidth?: boolean
}

const HeaderSearch: React.FC<HeaderSearchProps> = (props) => {
  const { sx, onSearch, fullWidth, ...rest } = props

  return (
    <Box
      component="form"
      sx={{ ...sx, ...(fullWidth && { width: '100%' }) }}
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const searchValue = String(formData.get('search'))
        return onSearch(searchValue)
      }}
      {...rest}
    >
      <InputBase
        sx={{
          width: { xs: '100%', md: 'auto' },
          minHeight: (theme) => ({ xs: theme.spacing(6), md: 'inherit' }),
          position: 'relative',

          // Border
          borderRadius: (theme) => ({ xs: 0, md: theme.shape.borderRadius }),
          border: (theme) => `1px solid ${alpha(theme.palette.grey['400'], 0.2)}`,

          // Color
          backgroundColor: (theme) => alpha(theme.palette.grey['400'], 0.15),
          '&:hover': { backgroundColor: (theme) => alpha(theme.palette.grey['400'], 0.25) },
          color: 'inherit',

          // Spacing
          marginLeft: 0,
          paddingLeft: 1,

          '& .MuiInputBase-input': {
            width: { xs: '100%', md: '20ch' },
            transition: (theme) => theme.transitions.create('width'),
            padding: (theme) => theme.spacing(0.5, 1, 0.5, 0),
            '&:focus': { width: { xs: 'initial', md: '30ch' } },
          },

          '& .MuiInputAdornment-root': { color: 'inherit' },
        }}
        name="search"
        placeholder="Search..."
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        }
      />
    </Box>
  )
}

export default HeaderSearch
