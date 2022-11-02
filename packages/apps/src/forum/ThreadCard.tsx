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
import { Thread } from './types'

export interface ThreadCardProps extends CardProps {
  item: Thread
  threadModule: CrudModule | any
  forumCategoryModule: CrudModule | any
  size?: 'small' | 'medium' | 'large'
  cardContentProps?: CardContentProps
  disableTitle?: boolean
  isDetail?: boolean
}

const ThreadCard: React.FC<ThreadCardProps> = (props) => {
  const {
    item,
    size = 'medium',
    threadModule,
    forumCategoryModule,
    cardContentProps,
    disableTitle,
    isDetail,
    sx,
    stretch,
    ...rest
  } = props

  if (!item) return null

  const isSmall = size === 'small'
  const isLarge = size === 'large'

  const { title, content, person, forum_category, created_at, upvote_count } =
    item

  const threadHref = threadModule.getWebHref([
    forum_category?.forum,
    forum_category,
    item,
  ])

  const handleUpvoteClick = () => {
    return updateIncrementCount({
      item,
      module: threadModule as CrudModule,
      countColumnName: 'upvote_count',
    })
  }

  return (
    <Box
      sx={{
        ...(stretch && {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }),
      }}
    >
      <Box sx={{ mb: 1 }}>
        {/* Author Line */}
        {person && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{
              '&': { display: 'block' },
              '& > *': { display: 'inline-block' },
            }}
          >
            <div>
              <StorageAvatar
                letterAltFallback
                src={person.avatar_src}
                alt={person.avatar_alt || person.title}
                size={24}
              />
            </div>
            <Typography variant="subtitle2">
              {person.first_name || person.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              asked {isDetail ? 'this' : 'a'} question in
            </Typography>
            <Link
              href={forumCategoryModule.getWebHref([
                forum_category?.forum,
                forum_category,
              ])}
            >
              <Typography variant="subtitle2">
                {forum_category?.title}
              </Typography>
            </Link>
            <Typography variant="body2" color="text.secondary">
              on {dayjs(created_at).format('D MMM YY')}
            </Typography>
          </Stack>
        )}
      </Box>

      <Card key={item.id} border sx={sx} stretch={stretch} {...rest}>
        {/* Title */}
        {!disableTitle && (
          <Link
            variant={isLarge ? 'h2' : isSmall ? 'h4' : 'h3'}
            href={threadHref}
            sx={{
              mb: 1,
              ...(stretch && {
                height: '100%',
              }),
            }}
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
              <>
                <Truncate
                  lines={3}
                  dangerouslySetInnerHTML={{ __html: printHtml(content) }}
                />
                {printHtml(content).length > 150 && (
                  <Link
                    href={threadHref}
                    sx={{ mt: 1 }}
                    variant="subtitle2"
                    color="text.secondary"
                  >
                    Read more
                  </Link>
                )}
              </>
            )}
          </Box>
        )}

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
    </Box>
  )
}

export default ThreadCard
