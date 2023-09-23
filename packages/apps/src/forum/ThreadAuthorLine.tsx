import React from 'react'

import { StorageAvatar } from '@gravis-os/storage'
import { CrudModuleWithGetWebHref, Person } from '@gravis-os/types'
import { Link, Stack, Typography } from '@gravis-os/ui'
import dayjs from 'dayjs'

import { ForumCategory, Thread, ThreadComment } from './types'

export interface ThreadAuthorLineProps {
  forumCategory?: ForumCategory
  forumCategoryModule?: CrudModuleWithGetWebHref
  item?: Thread | ThreadComment
  person?: Person
}

const ThreadAuthorLine: React.FC<ThreadAuthorLineProps> = (props) => {
  const { forumCategory, forumCategoryModule, item, person } = props
  if (!person) return null
  return (
    <Stack
      alignItems="center"
      direction="row"
      spacing={0.5}
      sx={{
        '&': { display: 'block' },
        '& > *': { display: 'inline-block' },
      }}
    >
      <div>
        <StorageAvatar
          alt={person.avatar_alt || person.title}
          letterAltFallback
          size={24}
          src={person.avatar_src}
        />
      </div>

      <Typography variant="subtitle2">
        {person.first_name || person.title}
      </Typography>

      <Typography color="text.secondary" variant="body2">
        {forumCategoryModule ? 'asked' : 'replied'} a question
        {forumCategoryModule ? ' in' : ''}
      </Typography>

      {forumCategoryModule && (
        <Link
          href={forumCategoryModule.getWebHref([
            forumCategory?.forum,
            forumCategory,
          ])}
        >
          <Typography variant="subtitle2">{forumCategory?.title}</Typography>
        </Link>
      )}

      <Typography color="text.secondary" variant="body2">
        on {dayjs(item?.created_at).format('D MMM YY')}
      </Typography>
    </Stack>
  )
}

export default ThreadAuthorLine
