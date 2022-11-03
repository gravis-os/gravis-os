import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContentProps,
  CardProps,
  Html,
  Stack,
  Typography,
} from '@gravis-os/ui'
import { StorageAvatar } from '@gravis-os/storage'
import { CrudModule } from '@gravis-os/types'
import dayjs from 'dayjs'
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined'
import { useUpdateIncrementCount } from '@gravis-os/query'
import { CrudModuleWithGetWebHref, ThreadComment } from './types'

export interface ThreadCommentProps extends CardProps {
  item: ThreadComment
  threadModule: CrudModuleWithGetWebHref
  threadCommentModule: CrudModuleWithGetWebHref
  forumCategoryModule: CrudModuleWithGetWebHref
  size?: 'small' | 'medium' | 'large'
  cardContentProps?: CardContentProps
}

const ThreadComment: React.FC<ThreadCommentProps> = (props) => {
  const {
    item,
    size = 'medium',
    threadModule,
    threadCommentModule,
    forumCategoryModule,
    cardContentProps,
    sx,
    ...rest
  } = props

  if (!item) return null

  const { content, person, created_at, upvote_count } = item

  const { updateIncrementCount: updateThreadCommentUpvoteCount } =
    useUpdateIncrementCount({
      module: threadCommentModule as CrudModule,
      countColumnName: 'upvote_count',
    })

  const handleUpvoteClick = async () => updateThreadCommentUpvoteCount(item)

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
