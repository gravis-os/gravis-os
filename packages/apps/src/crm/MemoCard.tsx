import React from 'react'
import { Box, Card, Stack, Typography } from '@gravis-os/ui'
import { printDateTime, printHtml } from '@gravis-os/utils'

export interface MemoCardProps {
  item: {
    title: React.ReactNode
    content?: string
    user?: { full_name?: string; title?: string }
    created_at?: string | Date
  }
  actions?: React.ReactNode
}

const MemoCard: React.FC<MemoCardProps> = (props) => {
  const { item, actions } = props
  const { title, content, user, created_at } = item

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
