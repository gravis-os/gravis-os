import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardContentProps,
  CardProps,
  Html,
  Link,
  Stack,
  Typography,
} from '@gravis-os/ui'
import { printHtml } from '@gravis-os/utils'
import { StorageAvatar } from '@gravis-os/storage'
import { CrudModule } from '@gravis-os/types'
import dayjs from 'dayjs'
import Truncate from 'react-truncate-html'
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined'
import { updateIncrementCount } from '@gravis-os/query'
import { ThreadComment } from './types'

export interface ThreadCommentProps extends CardProps {
  item: ThreadComment
  threadModule: CrudModule | any
  threadCommentModule: CrudModule | any
  forumCategoryModule: CrudModule | any
  size?: 'small' | 'medium' | 'large'
  cardContentProps?: CardContentProps
  disableTitle?: boolean
}

const ThreadComment: React.FC<ThreadCommentProps> = (props) => {
  const {
    item,
    size = 'medium',
    threadModule,
    threadCommentModule,
    forumCategoryModule,
    cardContentProps,
    disableTitle,
    sx,
    ...rest
  } = props

  if (!item) return null

  const isSmall = size === 'small'
  const isLarge = size === 'large'

  const { title, content, person, created_at, upvote_count } = item

  const threadHref = ''

  const handleUpvoteClick = () => {
    return updateIncrementCount({
      item,
      module: threadCommentModule as CrudModule,
      countColumnName: 'upvote_count',
    })
  }

  return (
    <div>
      <Card key={item.id} border sx={sx} {...rest}>
        {/* Author Line */}
        <Box sx={{ mb: 1 }}>
          {person && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <StorageAvatar
                letterAltFallback
                src={person.avatar_src}
                alt={person.avatar_alt || person.title}
                size={24}
              />
              <Typography variant="subtitle2">
                {person.first_name || person.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                replied
              </Typography>
              <Typography variant="body2" color="text.secondary">
                on {dayjs(created_at).format('D MMM YY')}
              </Typography>
            </Stack>
          )}
        </Box>

        {/* Title */}
        {!disableTitle && (
          <Link
            variant={isLarge ? 'h2' : isSmall ? 'h4' : 'h3'}
            href={threadHref}
            sx={{ mb: 1 }}
          >
            {title}
          </Link>
        )}

        {content && <Html html={content} />}

        {/* Actions */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
          <Button
            disableLineHeight
            disableMinWidth
            variant="action"
            size="small"
            startIcon={<ArrowUpwardOutlinedIcon fontSize="small" />}
            onClick={handleUpvoteClick}
          >
            {upvote_count}
          </Button>
        </Stack>
      </Card>
    </div>
  )
}

export default ThreadComment
