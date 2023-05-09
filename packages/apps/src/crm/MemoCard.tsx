import React, { useState } from 'react'
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Stack,
  Typography,
  Button,
} from '@gravis-os/ui'
import Popover from '@mui/material/Popover'
import { printDateTime, printHtml } from '@gravis-os/utils'
import { MoreHorizOutlined } from '@mui/icons-material'

export interface MemoCardProps {
  item: {
    title: React.ReactNode
    content?: string
    user?: { full_name?: string; title?: string }
    created_at?: string | Date
  }
  actions?: React.ReactNode
  isMutable?: boolean
  editComponent?: React.ReactElement
  onSave?: () => Promise<void>
  onDelete?: () => Promise<void>
}

const MemoCard: React.FC<MemoCardProps> = (props) => {
  const { item, actions, isMutable, editComponent, onSave, onDelete } = props
  const { title, content, user, created_at } = item

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card
      overline={
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {printDateTime(created_at)}
        </Typography>
      }
    >
      {isMutable && (
        <CardHeader
          action={
            <>
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreHorizOutlined />
              </IconButton>
              <Popover
                id="memo-card-popover"
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Stack>
                  <Button
                    aria-label="Edit item"
                    onClick={async () => {
                      setIsEditing(true)
                      handleClose()
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    aria-label="Delete item"
                    onClick={async () => {
                      await onDelete?.()
                      handleClose()
                    }}
                    color="error"
                  >
                    Delete
                  </Button>
                </Stack>
              </Popover>
            </>
          }
        />
      )}
      <Stack spacing={1}>
        {isEditing ? (
          <>
            {React.cloneElement(editComponent, { item })}
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button
                aria-label="Cancel edit"
                onClick={() => {
                  setIsEditing(false)
                  handleClose()
                }}
              >
                Cancel
              </Button>
              <Button
                aria-label="Save item"
                onClick={async () => {
                  await onSave?.()
                  handleClose()
                }}
              >
                Save
              </Button>
            </Stack>
          </>
        ) : (
          <>
            {/* Header */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              {/* Title */}
              <div>
                <Typography display="inline-block" variant="subtitle1">
                  {title}
                </Typography>
                {user && (
                  <>
                    {' '}
                    by{' '}
                    <Typography
                      display="inline-block"
                      variant="body1"
                      color="text.secondary"
                    >
                      {user.full_name || user.title}
                    </Typography>
                  </>
                )}
              </div>

              {/* Right */}
              {actions && <Box sx={{ textAlign: 'right' }}>{actions}</Box>}
            </Stack>

            {content && (
              <Typography variant="body1">
                <div
                  dangerouslySetInnerHTML={{
                    __html: printHtml(content.replaceAll('\n', '<br />')),
                  }}
                />
              </Typography>
            )}
          </>
        )}
      </Stack>
    </Card>
  )
}

export default MemoCard
