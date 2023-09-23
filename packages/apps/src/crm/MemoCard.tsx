import type { RenderPropsFunction } from '@gravis-os/types'

import React, { useState } from 'react'

import {
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@gravis-os/ui'
import { printDateTime, printHtml } from '@gravis-os/utils'
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import PersonIcon from '@mui/icons-material/Person'
import Popover from '@mui/material/Popover'

export interface MemoCardProps {
  actions?: React.ReactNode
  isMutable?: boolean
  item: {
    assignee?: { full_name?: string; title?: string }
    contact?: Record<string, string>
    content?: string
    created_at?: Date | string
    location?: string
    priority?: string
    project?: Record<string, string>
    title: React.ReactNode
    user?: { full_name?: string; title?: string }
  }
  onDelete?: (item) => Promise<void>
  onSave?: (item) => Promise<void>
  renderEditComponent?: RenderPropsFunction<{
    finishEdit
    handleClose
    item
  }>
  showContact?: boolean
}

const MemoCard: React.FC<MemoCardProps> = (props) => {
  const {
    actions,
    isMutable,
    item,
    onDelete,
    onSave,
    renderEditComponent,
    showContact = false,
  } = props

  const {
    title,
    assignee = null,
    contact = null,
    content,
    created_at,
    location = null,
    priority = '',
    project = {},
    user,
  } = item

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const startEdit = () => {
    setIsEditing(true)
  }

  const finishEdit = () => {
    setIsEditing(false)
  }

  // only posts can be edited.
  const shouldEdit = title === 'Note'

  return (
    <Card
      overline={
        <Typography color="text.secondary" gutterBottom variant="body2">
          {printDateTime(created_at)}
        </Typography>
      }
    >
      <Stack spacing={1}>
        {isEditing ? (
          <>{renderEditComponent({ finishEdit, handleClose, item })}</>
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
                        color="text.secondary"
                        display="inline-block"
                        variant="body1"
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
                      color="primary"
                      icon={
                        !showContact && (
                          <LibraryBooksOutlinedIcon fontSize="small" />
                        )
                      }
                      label={
                        showContact
                          ? `Project: ${project?.title}`
                          : project?.title
                      }
                    />
                  )}
                  {priority && (
                    <Chip
                      color="primary"
                      icon={
                        !showContact && (
                          <FormatListNumberedOutlinedIcon fontSize="small" />
                        )
                      }
                      label={showContact ? `Priority: ${priority}` : priority}
                    />
                  )}
                  {location && (
                    <Chip
                      color="primary"
                      icon={
                        !showContact && (
                          <LocationOnOutlinedIcon fontSize="small" />
                        )
                      }
                      label={showContact ? `Location: ${location}` : location}
                    />
                  )}
                  {assignee && (
                    <Chip
                      color="primary"
                      icon={!showContact && <PersonIcon fontSize="small" />}
                      label={
                        showContact
                          ? `Assignee: ${assignee.full_name}`
                          : assignee.full_name
                      }
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
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'bottom',
                  }}
                  id="memo-card-popover"
                  onClose={handleClose}
                  open={Boolean(anchorEl)}
                >
                  <Stack>
                    {shouldEdit && (
                      <Button
                        aria-label="Edit item"
                        onClick={() => {
                          startEdit()
                          handleClose()
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      aria-label="Delete item"
                      color="error"
                      onClick={async () => {
                        await onDelete?.(item)
                        handleClose()
                      }}
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
