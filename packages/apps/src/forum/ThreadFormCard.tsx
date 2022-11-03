import React from 'react'
import { Card, CardProps, Typography } from '@gravis-os/ui'
import { CrudItem } from '@gravis-os/types'
import ThreadForm, { ThreadFormProps } from './ThreadForm'

export interface ThreadFormCardProps extends CardProps {
  threadFormProps?: ThreadFormProps
  forumCategory?: CrudItem
}

const ThreadFormCard: React.FC<ThreadFormCardProps> = (props) => {
  const { threadFormProps, forumCategory } = props
  return (
    <Card border size="small">
      <Typography variant="h5" gutterBottom>
        Ask a Question
        {forumCategory ? ` in ${forumCategory.title}` : ''}
      </Typography>
      <ThreadForm {...threadFormProps} />
    </Card>
  )
}

export default ThreadFormCard
