import { Post, PressRelease } from '@gravis-os/types'
import { useMediaQuery, useTheme } from '@mui/material'

import { BlockProps } from '../web/Block/Block'
import renderHtmlBlockItem from './renderHtmlBlockItem'
import renderPostAuthorBlock from './renderPostAuthorBlock'

export interface RenderPostDetailBlockItemProps
  extends Omit<BlockProps, 'items'> {
  disableAuthorDetails?: boolean
  item?: Post | PressRelease
}

const renderPostDetailBlock = (props: RenderPostDetailBlockItemProps) => {
  const { disableAuthorDetails, item, ...rest } = props
  const {
    author_avatar_alt,
    author_avatar_src,
    author_job_title,
    author_title,
    html,
    published_at,
  } = item

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })

  return {
    id: 'post-detail',
    items: [
      {
        gridItems: [
          !disableAuthorDetails &&
            isDesktop &&
            renderPostAuthorBlock({
              author_avatar_alt,
              author_avatar_src,
              author_job_title,
              author_title,
              published_at,
            }),
          renderHtmlBlockItem({ html }),
        ].filter(Boolean),
        type: 'grid',
      },
    ],
    sx: { backgroundColor: 'background.paper' },
    ...rest,
  }
}

export default renderPostDetailBlock
