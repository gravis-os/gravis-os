import React from 'react'

import { CrudItem } from '@gravis-os/types'
import { Card, CardProps, Typography } from '@gravis-os/ui'

import ThreadForm, { ThreadFormProps } from './ThreadForm'

export interface ThreadFormCardProps extends CardProps {
  forumCategory?: CrudItem
  threadFormProps?: ThreadFormProps
}

const ThreadFormCard: React.FC<ThreadFormCardProps> = (props) => {
  const { forumCategory, threadFormProps } = props
  return (
    <Card border size="small">
      <Typography gutterBottom variant="h5">
        Ask a Question
        {forumCategory ? ` in ${forumCategory.title}` : ''}
      </Typography>
      <ThreadForm {...threadFormProps} />
    </Card>
  )
}

export default ThreadFormCard
