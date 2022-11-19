import React from 'react'
import { InputAdornment, TextField, Tooltip } from '@mui/material'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import toast from 'react-hot-toast'
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
      inputProps={{ readOnly: true }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="Copy Link">
              <Button
                square
                variant="paper"
                startIcon={<ContentCopyOutlinedIcon fontSize="small" />}
                sx={{
                  mr: -1.5,
                  '&:hover': {
                    backgroundColor: 'background.paper',
                    color: 'primary.main',
                  },
                }}
                onClick={() => {
                  navigator.clipboard.writeText(url)
                  toast.success('Link copied to clipboard')
                }}
              >
                Copy Link
              </Button>
            </Tooltip>
          </InputAdornment>
        ),
      }}
      value={url}
      fullWidth
      size="small"
      sx={{
        '& .MuiInputBase-root': {
          backgroundColor: 'background.muted',
        },
        '& .MuiInputBase-input': {
          pl: 1,
          pb: 1,
          pt: 1.5,
        },
      }}
    />
  )
}

export default CopyLink
