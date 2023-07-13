import { Post, PressRelease } from '@gravis-os/types'
import { useMediaQuery, useTheme } from '@mui/material'
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

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })

  return {
    key: 'post-detail',
    sx: { backgroundColor: 'background.paper' },
    items: [
      {
        type: 'grid',
        gridItems: [
          !disableAuthorDetails &&
            isDesktop &&
            renderPostAuthorBlock({
              author_avatar_src,
              author_avatar_alt,
              author_title,
              author_job_title,
              published_at,
            }),
          renderHtmlBlockItem({ html }),
        ].filter(Boolean),
      },
    ],
    ...rest,
  }
}

export default renderPostDetailBlock
