import dayjs from 'dayjs'
import { Post } from '@gravis-os/types'

export interface RenderPostAuthorBlockProps {
  author_avatar_src: Post['author_avatar_src']
  author_avatar_alt: Post['author_avatar_alt']
  author_title: Post['author_title']
  author_job_title: Post['author_job_title']
  published_at: Post['published_at']
}

const renderPostAuthorBlock = (props: RenderPostAuthorBlockProps) => {
  const {
    author_avatar_src,
    author_avatar_alt,
    author_title,
    author_job_title,
    published_at,
  } = props
  return {
    md: 3,
    lg: 2,
    items: [
      {
        type: 'image',
        title: author_avatar_src,
        titleProps: {
          alt: author_avatar_alt,
          width: 40,
          height: 40,
          sx: { mt: { xs: 4, md: 0 } },
        },
      },
      { type: 'body1', title: author_title },
      {
        type: 'body1',
        title: author_job_title,
        titleProps: { color: 'text.secondary' },
      },
      {
        type: 'body2',
        title: published_at
          ? dayjs(published_at).format('ddd, DD MMM YYYY')
          : '',
        titleProps: { color: 'text.secondary', sx: { marginTop: 1 } },
      },
    ],
  }
}

export default renderPostAuthorBlock
