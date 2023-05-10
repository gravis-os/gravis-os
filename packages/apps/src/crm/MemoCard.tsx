import React, { useState } from 'react'
import {
  Box,
  Card,
  Chip,
  IconButton,
  Stack,
  Typography,
  Button,
} from '@gravis-os/ui'
import Popover from '@mui/material/Popover'
import { printDateTime, printHtml } from '@gravis-os/utils'
import type { RenderPropsFunction } from '@gravis-os/types'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'

export interface MemoCardProps {
  item: {
    title: React.ReactNode
    content?: string
    user?: { full_name?: string; title?: string }
    created_at?: string | Date
    project?: Record<string, string>
    priority?: string
    contact?: Record<string, string>
  }
  actions?: React.ReactNode
  showContact?: boolean
  isMutable?: boolean
  renderEditComponent?: RenderPropsFunction<{ item }>
  onSave?: (item) => Promise<void>
  onDelete?: (item) => Promise<void>
}

const MemoCard: React.FC<MemoCardProps> = (props) => {
  const {
    item,
    actions,
    showContact = false,
    isMutable,
    renderEditComponent,
    onSave,
    onDelete,
  } = props

  const {
    title,
    content,
    user,
    created_at,
    project = {},
    priority = '',
    contact = null,
  } = item

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // only posts can be edited.
  const shouldEdit = title === 'Note'

  return (
    <Card
      overline={
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {printDateTime(created_at)}
        </Typography>
      }
    >
      <Stack spacing={1}>
        {isEditing ? (
          <>
            {renderEditComponent({ item })}
            <Stack
              flexDirection="row"
              justifyContent="flex-end"
              spacing={1}
              gap={1}
              sx={{ '&>:not(style)+:not(style)': { m: 0 } }}
            >
              <Button
                aria-label="Save item"
                variant="contained"
                onClick={async () => {
                  await onSave?.(item)
                  setIsEditing(false)
                  handleClose()
                }}
              >
                Save
              </Button>
              <Button
                aria-label="Cancel edit"
                variant="outlined"
                onClick={() => {
                  setIsEditing(false)
                  handleClose()
                }}
              >
                Cancel
              </Button>
            </Stack>
          </>
        ) : (
          <Stack flexDirection="row">
            <Stack spacing={1}>
              {/* Header */}
              <Stack justifyContent="space-between" spacing={1}>
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

                {/* Chips */}
                <Stack flexDirection="row" gap={1}>
                  {project?.title && (
                    <Chip
                      icon={
                        !showContact && (
                          <LibraryBooksOutlinedIcon fontSize="small" />
                        )
                      }
                      color="primary"
                      label={
                        showContact
                          ? `Project: ${project?.title}`
                          : project?.title
                      }
                    />
                  )}
                  {priority && (
                    <Chip
                      icon={
                        !showContact && (
                          <FormatListNumberedOutlinedIcon fontSize="small" />
                        )
                      }
                      color="primary"
                      label={showContact ? `Priority: ${priority}` : priority}
                    />
                  )}
                  {showContact && (
                    <>
                      {/* @ts-ignore */}
                      {contact?.company?.title && (
                        // @ts-ignore
                        <Chip
                          color="primary"
                          label={`Company: ${contact?.title}`}
                        />
                      )}

                      {/* @ts-ignore */}
                      {contact?.full_name && (
                        <Chip
                          color="primary"
                          // @ts-ignore
                          label={`Contact: ${contact?.full_name}`}
                        />
                      )}
                    </>
                  )}
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
              </Stack>
            </Stack>
            {isMutable && (
              <Box>
                <IconButton aria-label="settings" onClick={handleClick}>
                  <MoreHorizOutlinedIcon />
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
                    {shouldEdit && (
                      <Button
                        aria-label="Edit item"
                        onClick={() => {
                          setIsEditing(true)
                          handleClose()
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      aria-label="Delete item"
                      onClick={async () => {
                        await onDelete?.(item)
                        handleClose()
                      }}
                      color="error"
                    >
                      Delete
                    </Button>
                  </Stack>
                </Popover>
              </Box>
            )}
          </Stack>
        )}
      </Stack>
    </Card>
  )
}

export default MemoCard
