import React from 'react'
import { Card, CardProps, Link, Typography } from '@gravis-os/ui'
import { CrudModuleWithGetWebHref, Thread } from './types'

export interface ThreadListItemProps extends CardProps {
  item: Thread
  threadModule: CrudModuleWithGetWebHref
  size?: 'small' | 'medium' | 'large'
  cardProps?: CardProps
}

const ThreadListItem: React.FC<ThreadListItemProps> = (props) => {
  const { item, size = 'medium', threadModule, cardProps, sx } = props

  if (!item) return null

  const isSmall = size === 'small'
  const isLarge = size === 'large'

  const { title, subtitle, forum_category } = item

  const threadHref = threadModule.getWebHref([
    forum_category?.forum,
    forum_category,
    item,
  ])

  return (
    <Card
      size={size}
      key={item.id}
      sx={{ ...sx, ...cardProps?.sx } as CardProps['sx']}
      {...cardProps}
    >
      <Link
        variant={isLarge ? 'h3' : isSmall ? 'body2' : 'h4'}
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
    </Card>
  )
}

export default ThreadListItem
