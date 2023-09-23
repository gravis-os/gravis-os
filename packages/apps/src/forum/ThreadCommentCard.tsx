import React from 'react'

import { useUpdateIncrementCount } from '@gravis-os/query'
import { CrudModule, CrudModuleWithGetWebHref } from '@gravis-os/types'
import {
  Box,
  Button,
  Card,
  CardContentProps,
  CardProps,
  Html,
  Stack,
} from '@gravis-os/ui'
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined'

import ThreadAuthorLine from './ThreadAuthorLine'
import { ThreadComment } from './types'

export interface ThreadCommentProps extends CardProps {
  cardContentProps?: CardContentProps
  forumCategoryModule: CrudModuleWithGetWebHref
  item: ThreadComment
  size?: 'large' | 'medium' | 'small'
  threadCommentModule: CrudModuleWithGetWebHref
  threadModule: CrudModuleWithGetWebHref
}

const ThreadComment: React.FC<ThreadCommentProps> = (props) => {
  const {
    cardContentProps,
    forumCategoryModule,
    item,
    size = 'medium',
    sx,
    threadCommentModule,
    threadModule,
    ...rest
  } = props

  if (!item) return null

  const { id, content, person, upvote_count } = item

  const { updateIncrementCount: updateThreadCommentUpvoteCount } =
    useUpdateIncrementCount({
      countColumnName: 'upvote_count',
      module: threadCommentModule as CrudModule,
    })

  const handleUpvoteClick = async () => updateThreadCommentUpvoteCount(item)

  return (
    <div>
      <Card border key={id} sx={sx} {...rest}>
        {/* Author Line */}
        <Box sx={{ mb: 1 }}>
          <ThreadAuthorLine item={item} person={person} />
        </Box>

        {content && <Html html={content} />}

        {/* Actions */}
        <Stack alignItems="center" direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button
            disableLineHeight
            disableMinWidth
            onClick={handleUpvoteClick}
            size="small"
            startIcon={<ArrowUpwardOutlinedIcon fontSize="small" />}
            variant="action"
          >
            {upvote_count}
          </Button>
        </Stack>
      </Card>
    </div>
  )
}

export default ThreadComment
