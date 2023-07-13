import { Post, PressRelease } from '@gravis-os/types'
import renderHtmlBlockItem from './renderHtmlBlockItem'
import { BlockProps } from '../web/Block/Block'
import renderPostAuthorBlock from './renderPostAuthorBlock'

export interface RenderPostDetailBlockItemProps
  extends Omit<BlockProps, 'items'> {
  disableAuthorDetails?: boolean
  item?: PressRelease | Post
}

const renderPostDetailBlock = (props: RenderPostDetailBlockItemProps) => {
  const { item, disableAuthorDetails, ...rest } = props
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
          !disableAuthorDetails &&
            renderPostAuthorBlock({
              author_avatar_src,
              author_avatar_alt,
              author_title,
              author_job_title,
              published_at,
            }),
          renderHtmlBlockItem({ html }),
        ],
      },
    ],
    ...rest,
  }
}

export default renderPostDetailBlock
