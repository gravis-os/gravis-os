import React from 'react'
import {
  Box,
  Card,
  CardContent,
  CardContentProps,
  CardProps,
  Html,
  Link,
  Stack,
  Typography,
} from '@gravis-os/ui'
import { StorageAvatar } from '@gravis-os/storage'
import { CrudModule } from '@gravis-os/types'
import dayjs from 'dayjs'
import { Thread } from './types'

export interface ThreadCardProps extends CardProps {
  item: Thread
  threadModule: CrudModule | any
  forumCategoryModule: CrudModule | any
  size?: 'small' | 'medium' | 'large'
  cardContentProps?: CardContentProps
}

const ThreadCard: React.FC<ThreadCardProps> = (props) => {
  const {
    item,
    size = 'medium',
    threadModule,
    forumCategoryModule,
    cardContentProps,
    sx,
    ...rest
  } = props

  if (!item) return null

  const isSmall = size === 'small'
  const isLarge = size === 'large'

  const { title, content, person, forum_category, created_at } = item

  const threadHref = threadModule.getWebHref([
    forum_category?.forum,
    forum_category,
    item,
  ])

  return (
    <div>
      <Box sx={{ mb: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <StorageAvatar
            src={person.avatar_src}
            alt={person.avatar_alt || person.title}
            size={24}
          />
          <Typography variant="subtitle2">
            {person.first_name || person.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            asked a question in
          </Typography>
          <Link
            href={forumCategoryModule.getWebHref([
              forum_category.forum,
              forum_category,
            ])}
          >
            <Typography variant="subtitle2">{forum_category.title}</Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">
            on {dayjs(created_at).format('D MMM YY')}
          </Typography>
        </Stack>
      </Box>

      <Card key={item.id} disableCardContent sx={sx} {...rest}>
        <CardContent {...cardContentProps}>
          <Link
            variant={isLarge ? 'h2' : isSmall ? 'h4' : 'h3'}
            href={threadHref}
          >
            {title}
          </Link>

          {content && (
            <Html html={content} sx={{ mt: 1, color: 'text.secondary' }} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ThreadCard
