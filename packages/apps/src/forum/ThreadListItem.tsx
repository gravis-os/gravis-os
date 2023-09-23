import React from 'react'

import { CrudModuleWithGetWebHref } from '@gravis-os/types'
import { Card, CardProps, Link, Typography } from '@gravis-os/ui'

import { Thread } from './types'

export interface ThreadListItemProps extends CardProps {
  cardProps?: CardProps
  item: Thread
  size?: 'large' | 'medium' | 'small'
  threadModule: CrudModuleWithGetWebHref
}

const ThreadListItem: React.FC<ThreadListItemProps> = (props) => {
  const { cardProps, item, size = 'medium', sx, threadModule } = props

  if (!item) return null

  const isSmall = size === 'small'
  const isLarge = size === 'large'

  const { id, title, forum_category, subtitle } = item

  const threadHref = threadModule.getWebHref([
    forum_category?.forum,
    forum_category,
    item,
  ])

  return (
    <Card
      key={id}
      size={size}
      sx={{ ...sx, ...cardProps?.sx } as CardProps['sx']}
      {...cardProps}
    >
      <Link
        href={threadHref}
        // prettier-ignore
        variant={isLarge ? 'h3' : (isSmall ? 'body2' : 'h4')}
      >
        {title}
      </Link>
      {subtitle && (
        <Typography
          color="text.secondary"
          maxLines={3}
          variant={isSmall ? 'body2' : 'body1'}
        >
          {subtitle}
        </Typography>
      )}
    </Card>
  )
}

export default ThreadListItem
