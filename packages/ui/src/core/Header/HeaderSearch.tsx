import React, { useRef } from 'react'
import { Box, BoxProps, InputAdornment, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { alpha } from '@mui/material/styles'
import IconButton from '../IconButton'

type HeaderSearchOnSearchFunction = (searchValue: string) => void

export interface HeaderSearchProps extends BoxProps {
  onSearch: HeaderSearchOnSearchFunction
  fullWidth?: boolean
  compact?: boolean
}

const HeaderSearch: React.FC<HeaderSearchProps> = (props) => {
  const { sx, onSearch, fullWidth, compact, ...rest } = props

  const inputRef = useRef<HTMLInputElement>()
  const handleFocusInput = () => {
    if (inputRef.current) inputRef.current.focus()
  }

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
        inputRef={inputRef}
        sx={{
          width: { xs: '100%', md: 'auto' },
          minHeight: (theme) => ({ xs: theme.spacing(6), md: 'inherit' }),
          position: 'relative',

          // Border
          borderRadius: (theme) => ({ xs: 0, md: theme.shape.borderRadius }),
          border: (theme) =>
            `1px solid ${alpha(theme.palette.grey['400'], 0.2)}`,

          // Color
          backgroundColor: (theme) => alpha(theme.palette.grey['400'], 0.15),
          '&:hover': {
            backgroundColor: (theme) => alpha(theme.palette.grey['400'], 0.25),
          },
          color: 'inherit',

          // Spacing
          marginLeft: 0,
          paddingLeft: 1,

          '& .MuiInputBase-input': {
            width: { xs: '100%', md: compact ? '0ch' : '20ch' },
            transition: (theme) => theme.transitions.create('width'),
            padding: (theme) => theme.spacing(0.5, compact ? 0 : 1, 0.5, 0),
            '&:focus': {
              width: { xs: 'initial', md: '30ch' },
              paddingRight: (theme) => theme.spacing(1),
            },
          },

          '& .MuiInputAdornment-root': { color: 'inherit' },
        }}
        name="search"
        placeholder="Search..."
        startAdornment={
          <InputAdornment position="start">
            <IconButton
              onClick={handleFocusInput}
              color="inherit"
              sx={{ p: 0 }}
            >
              <SearchIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        }
      />
    </Box>
  )
}

export default HeaderSearch
