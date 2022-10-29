import React from 'react'
import {
  Box,
  BoxProps,
  Card,
  CardContent,
  CardProps,
  Grid,
  Link,
  Typography,
} from '@gravis-os/ui'
import { CrudModule } from '@gravis-os/types'
import { Thread } from './types'

export interface ThreadListItemProps extends CardProps {
  item: Thread
  threadModule: CrudModule | any
  forumCategoryModule: CrudModule | any
  size?: 'small' | 'medium' | 'large'
  cardContentProps?: BoxProps
}

const ThreadListItem: React.FC<ThreadListItemProps> = (props) => {
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

  const { title, subtitle, avatar_src, avatar_alt, forum_category } = item

  const threadHref = threadModule.getWebHref([
    forum_category?.forum,
    forum_category,
    item,
  ])

  return (
    <Card key={item.id} disableCardContent sx={{ ...sx }} {...rest}>
      <Box
        stretch
        {...cardContentProps}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: 2,
          py: 1,
          ...cardContentProps?.sx,
        }}
      >
        <Link
          variant={isLarge ? 'h3' : isSmall ? 'h5' : 'h4'}
          href={threadHref}
        >
          {title}
        </Link>
        {subtitle && (
          <Typography
            variant={isSmall ? 'body2' : 'body1'}
            color="text.secondary"
            maxLines={3}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </Card>
  )
}

export default ThreadListItem
