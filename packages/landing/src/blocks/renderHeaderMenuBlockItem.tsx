import { BlockItemProps } from '@gravis-os/landing'

export interface RenderHeaderMenuBlockItemProps {
  title: BlockItemProps['title']
  slug?: string
  subtitle?: BlockItemProps['title']
  href?: BlockItemProps['boxProps']['href']
  hrefProps?: BlockItemProps['boxProps']['hrefProps']
  items?: BlockItemProps[]
}

const renderHeaderMenuBlockItem = (props: RenderHeaderMenuBlockItemProps) => {
  const {
    slug,
    href: injectedHref,
    hrefProps,
    title,
    subtitle,
    items = [],
  } = props

  const href = injectedHref || (slug && `/${slug}`)

  return {
    boxProps: {
      href,
      hrefProps,
      sx: {
        py: 1.5,
        px: 2,
        mt: -1.5,
        borderRadius: 1,
        ...(href && {
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'action.hover',
          },
          '&:active': {
            backgroundColor: 'action.selected',
          },
        }),
      },
    },
    items: [
      {
        type: 'h6',
        title,
        titleProps: {
          mb: 0.5,
          ...(!href && { sx: { color: 'text.disabled' } }),
        },
      },
      {
        type: 'caption',
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxLines: 2,
          ...(!href && { sx: { color: 'text.disabled' } }),
        },
      },
      ...items,
    ],
  }
}

export default renderHeaderMenuBlockItem
