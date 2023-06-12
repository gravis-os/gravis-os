import { BlockProps } from '@gravis-os/landing'
import dayjs from 'dayjs'
import { Post, PressRelease } from '@gravis-os/types'
import renderHtmlBlockItem from './renderHtmlBlockItem'

export interface RenderPostDetailBlockItemProps
  extends Omit<BlockProps, 'items'> {
  item?: PressRelease | Post
}

const renderPostDetailBlock = (props: RenderPostDetailBlockItemProps) => {
  const { item, ...rest } = props
  const {
    author_avatar_src,
    author_avatar_alt,
    author_title,
    author_job_title,
    published_at,
    html,
  } = item

  return {
    key: 'post-detail',
    sx: { backgroundColor: 'background.paper' },
    items: [
      {
        type: 'grid',
        gridItems: [
          {
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
          },
          renderHtmlBlockItem({ html }),
        ],
      },
    ],
    ...rest,
  }
}

export default renderPostDetailBlock
