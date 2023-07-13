import { Post, PressRelease } from '@gravis-os/types'
import { useMediaQuery, useTheme } from '@mui/material'
import { BlockProps } from '../web/Block/Block'
import { BlockItemProps } from '../web/Block/BlockItem'
import renderPostAuthorBlock from './renderPostAuthorBlock'

export interface RenderPostHeroBlockItemProps extends BlockProps {
  overline?: string
  overlineProps?: BlockItemProps['titleProps']
  item: PressRelease | Post
  disableAuthorDetails?: boolean
}

const renderPostHeroBlockItem = (props: RenderPostHeroBlockItemProps) => {
  const { item, disableAuthorDetails, overline, overlineProps, ...rest } = props
  const {
    title,
    subtitle,
    hero_src,
    hero_alt,
    author_avatar_src,
    author_avatar_alt,
    author_title,
    author_job_title,
    published_at,
  } = item || {}

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })

  return {
    key: 'post-hero',
    pb: 0,
    pt: { xs: 2, md: 4 },
    sx: { backgroundColor: 'background.paper' },
    ...rest,
    items: [
      overline && {
        type: 'link',
        title: overline,
        titleProps: {
          variant: 'overline',
          sx: { mb: 2 },
          color: 'text.secondary',
          ...overlineProps,
        },
      },
      { type: 'h2', title, titleProps: { component: 'h1' } },
      !disableAuthorDetails &&
        !isDesktop &&
        renderPostAuthorBlock({
          author_avatar_src,
          author_avatar_alt,
          author_title,
          author_job_title,
          published_at,
        }),
      {
        type: 'subtitle1',
        title: subtitle,
        titleProps: {
          maxWidth: true,
          sx: { mt: 4 },
          color: 'text.secondary',
        },
      },
      {
        type: 'image',
        title: hero_src,
        titleProps: {
          alt: hero_alt,
          ar: '16:9',
          boxSx: { mt: 3 },
        },
      },
    ],
  }
}

export default renderPostHeroBlockItem
