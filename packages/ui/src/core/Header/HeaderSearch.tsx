import React, { useRef } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { Box, BoxProps, InputAdornment, InputBase } from '@mui/material'
import { alpha } from '@mui/material/styles'

import IconButton from '../IconButton'

type HeaderSearchOnSearchFunction = (searchValue: string) => void

export interface HeaderSearchProps extends BoxProps {
  compact?: boolean
  fullWidth?: boolean
  onSearch: HeaderSearchOnSearchFunction
}

const HeaderSearch: React.FC<HeaderSearchProps> = (props) => {
  const { compact, fullWidth, onSearch, sx, ...rest } = props

  const inputRef = useRef<HTMLInputElement>()
  const handleFocusInput = () => {
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const searchValue = String(formData.get('search'))
        return onSearch(searchValue)
      }}
      sx={{ ...sx, ...(fullWidth && { width: '100%' }) }}
      {...rest}
    >
      <InputBase
        inputRef={inputRef}
        name="search"
        placeholder="Search..."
        startAdornment={
          <InputAdornment position="start">
            <IconButton
              color="inherit"
              onClick={handleFocusInput}
              sx={{ p: 0 }}
            >
              <SearchIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        }
        sx={{
          '& .MuiInputAdornment-root': { color: 'inherit' },
          '& .MuiInputBase-input': {
            '&:focus': {
              paddingRight: (theme) => theme.spacing(1),
              width: { xs: 'initial', md: '30ch' },
            },
            padding: (theme) => theme.spacing(0.5, compact ? 0 : 1, 0.5, 0),
            transition: (theme) => theme.transitions.create('width'),
            width: { xs: '100%', md: compact ? '0ch' : '20ch' },
          },
          '&:hover': {
            backgroundColor: (theme) => alpha(theme.palette.grey['400'], 0.25),
          },

          // Color
          backgroundColor: (theme) => alpha(theme.palette.grey['400'], 0.15),
          border: (theme) =>
            `1px solid ${alpha(theme.palette.grey['400'], 0.2)}`,

          // Border
          borderRadius: (theme) => ({ xs: 0, md: theme.shape.borderRadius }),
          color: 'inherit',
          // Spacing
          marginLeft: 0,

          minHeight: (theme) => ({ xs: theme.spacing(6), md: 'inherit' }),
          paddingLeft: 1,

          position: 'relative',

          width: { xs: '100%', md: 'auto' },
        }}
      />
    </Box>
  )
}

export default HeaderSearch
