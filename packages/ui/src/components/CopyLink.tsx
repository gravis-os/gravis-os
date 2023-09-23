import React from 'react'
import toast from 'react-hot-toast'

import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import { InputAdornment, TextField, Tooltip } from '@mui/material'

import Button from '../core/Button'

export interface CopyLinkProps {
  url?: string
}

const CopyLink: React.FC<CopyLinkProps> = (props) => {
  const { url: injectedUrl } = props

  const url =
    injectedUrl || (typeof window !== 'undefined' && window.location.href)

  return (
    <TextField
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="Copy Link">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(url)
                  toast.success('Link copied to clipboard')
                }}
                square
                startIcon={<ContentCopyOutlinedIcon fontSize="small" />}
                sx={{
                  '&:hover': {
                    backgroundColor: 'background.paper',
                    color: 'primary.main',
                  },
                  mr: -1.5,
                }}
                variant="paper"
              >
                Copy Link
              </Button>
            </Tooltip>
          </InputAdornment>
        ),
      }}
      fullWidth
      inputProps={{ readOnly: true }}
      size="small"
      sx={{
        '& .MuiInputBase-input': {
          pb: 1,
          pl: 1,
          pt: 1.5,
        },
        '& .MuiInputBase-root': {
          backgroundColor: 'background.muted',
        },
      }}
      value={url}
    />
  )
}

export default CopyLink
