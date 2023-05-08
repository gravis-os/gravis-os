import React from 'react'
import { Box, Card, Chip, Stack, Typography } from '@gravis-os/ui'
import { printDateTime, printHtml } from '@gravis-os/utils'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined'

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
}

const MemoCard: React.FC<MemoCardProps> = (props) => {
  const { item, actions, showContact = false } = props
  const {
    title,
    content,
    user,
    created_at,
    project = {},
    priority = '',
    contact = null,
  } = item

  return (
    <Card
      overline={
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {printDateTime(created_at)}
        </Typography>
      }
    >
      <Stack spacing={1}>
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

        {/* Chips */}
        <Stack flexDirection="row" gap={1}>
          {project?.title && (
            <Chip
              icon={
                !showContact && <LibraryBooksOutlinedIcon fontSize="small" />
              }
              color="primary"
              label={
                showContact ? `Project: ${project?.title}` : project?.title
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
                <Chip color="primary" label={`Company: ${contact?.title}`} />
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
    </Card>
  )
}

export default MemoCard
