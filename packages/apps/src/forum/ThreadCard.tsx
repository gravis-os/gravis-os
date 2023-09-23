import React from 'react'
import Truncate from 'react-truncate-html'

import { useUpdateIncrementCount } from '@gravis-os/query'
import { CrudModule, CrudModuleWithGetWebHref } from '@gravis-os/types'
import {
  Box,
  Button,
  Card,
  CardContentProps,
  CardProps,
  Html,
  Link,
  Stack,
} from '@gravis-os/ui'
import { printHtml } from '@gravis-os/utils'
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined'

import ThreadAuthorLine from './ThreadAuthorLine'
import { Thread } from './types'

export interface ThreadCardProps extends CardProps {
  cardContentProps?: CardContentProps
  disableTitle?: boolean
  forumCategoryModule: CrudModuleWithGetWebHref
  isDetail?: boolean
  item: Thread
  size?: 'large' | 'medium' | 'small'
  threadModule: CrudModuleWithGetWebHref
}

const ThreadCard: React.FC<ThreadCardProps> = (props) => {
  const {
    cardContentProps,
    disableTitle,
    forumCategoryModule,
    isDetail,
    item,
    size = 'medium',
    stretch,
    sx,
    threadModule,
    ...rest
  } = props

  if (!item) return null

  const { id, title, content, forum_category, person, upvote_count } = item

  const threadHref = threadModule.getWebHref([
    forum_category?.forum,
    forum_category,
    item,
  ])

  const { updateIncrementCount: updateThreadUpvoteCount } =
    useUpdateIncrementCount({
      countColumnName: 'upvote_count',
      module: threadModule as CrudModule,
    })
  const handleUpvoteClick = async () => updateThreadUpvoteCount(item)

  return (
    <Box
      sx={{
        ...(stretch && {
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }),
      }}
    >
      <Box sx={{ mb: 1 }}>
        <ThreadAuthorLine
          forumCategory={forum_category}
          forumCategoryModule={forumCategoryModule}
          item={item}
          person={person}
        />
      </Box>

      <Card border key={id} stretch={stretch} sx={sx} {...rest}>
        {/* Title */}
        {!disableTitle && (
          <Link
            href={threadHref}
            sx={{
              mb: 1,
              ...(stretch && {
                height: '100%',
              }),
            }}
            variant="h4"
          >
            {title}
          </Link>
        )}

        {content && (
          <Box
            sx={{
              color: isDetail ? 'text.primary' : 'text.secondary',
            }}
          >
            {isDetail ? (
              <Html html={content} />
            ) : (
              <Box sx={{ '& p': { my: 0 }, mt: 1 }}>
                {printHtml(content) && (
                  <Truncate
                    dangerouslySetInnerHTML={{ __html: printHtml(content) }}
                    lines={3}
                  />
                )}
                {printHtml(content).length > 150 && (
                  <Link
                    color="text.secondary"
                    href={threadHref}
                    sx={{ mt: 1 }}
                    variant="subtitle2"
                  >
                    Read more
                  </Link>
                )}
              </Box>
            )}
          </Box>
        )}

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
    </Box>
  )
}

export default ThreadCard
