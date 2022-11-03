import React from 'react'
import { StorageAvatar } from '@gravis-os/storage'
import { Link, Stack, Typography } from '@gravis-os/ui'
import dayjs from 'dayjs'
import { CrudModuleWithGetWebHref, Person } from '@gravis-os/types'
import { ForumCategory, Thread, ThreadComment } from './types'

export interface ThreadAuthorLineProps {
  person?: Person
  item?: Thread | ThreadComment
  forumCategory?: ForumCategory
  forumCategoryModule?: CrudModuleWithGetWebHref
}

const ThreadAuthorLine: React.FC<ThreadAuthorLineProps> = (props) => {
  const { person, item, forumCategory, forumCategoryModule } = props
  if (!person) return null
  return (
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

      <Typography variant="body2" color="text.secondary">
        on {dayjs(item?.created_at).format('D MMM YY')}
      </Typography>
    </Stack>
  )
}

export default ThreadAuthorLine
