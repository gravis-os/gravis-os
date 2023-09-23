import { Post, PressRelease } from '@gravis-os/types'
import { useMediaQuery, useTheme } from '@mui/material'

import { BlockProps } from '../web/Block/Block'
import { BlockItemProps } from '../web/Block/BlockItem'
import renderPostAuthorBlock from './renderPostAuthorBlock'

export interface RenderPostHeroBlockItemProps extends BlockProps {
  disableAuthorDetails?: boolean
  item: Post | PressRelease
  overline?: string
  overlineProps?: BlockItemProps['titleProps']
}

const renderPostHeroBlockItem = (props: RenderPostHeroBlockItemProps) => {
  const { disableAuthorDetails, item, overline, overlineProps, ...rest } = props
  const {
    title,
    author_avatar_alt,
    author_avatar_src,
    author_job_title,
    author_title,
    hero_alt,
    hero_src,
    published_at,
    subtitle,
  } = item || {}

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })

  return {
    id: 'post-hero',
    pb: 0,
    pt: { xs: 2, md: 4 },
    sx: { backgroundColor: 'background.paper' },
    ...rest,
    items: [
      overline && {
        title: overline,
        titleProps: {
          color: 'text.secondary',
          sx: { mb: 2 },
          variant: 'overline',
          ...overlineProps,
        },
        type: 'link',
      },
      { title, titleProps: { component: 'h1' }, type: 'h2' },
      ...(!disableAuthorDetails && !isDesktop
        ? renderPostAuthorBlock({
            author_avatar_alt,
            author_avatar_src,
            author_job_title,
            author_title,
            published_at,
          }).items
        : []),
      {
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxWidth: true,
          sx: { mt: 4 },
        },
        type: 'subtitle1',
      },
      {
        title: hero_src,
        titleProps: {
          alt: hero_alt,
          ar: '16:9',
          boxSx: { mt: 3 },
        },
        type: 'image',
      },
    ],
  }
}

export default renderPostHeroBlockItem
