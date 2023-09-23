import { BlockItemProps } from '../web/Block/BlockItem'

export interface RenderHeaderMenuBlockItemProps {
  href?: BlockItemProps['boxProps']['href']
  hrefProps?: BlockItemProps['boxProps']['hrefProps']
  items?: BlockItemProps[]
  slug?: string
  subtitle?: BlockItemProps['title']
  title: BlockItemProps['title']
}

const renderHeaderMenuBlockItem = (props: RenderHeaderMenuBlockItemProps) => {
  const {
    title,
    slug,
    href: injectedHref,
    hrefProps,
    items = [],
    subtitle,
  } = props

  const href = injectedHref || (slug && `/${slug}`)

  return {
    boxProps: {
      href,
      hrefProps,
      sx: {
        borderRadius: 1,
        mt: -1.5,
        px: 2,
        py: 1.5,
        ...(href && {
          '&:active': {
            backgroundColor: 'action.selected',
          },
          '&:hover': {
            backgroundColor: 'action.hover',
            cursor: 'pointer',
          },
        }),
      },
    },
    items: [
      {
        title,
        titleProps: {
          mb: 0.5,
          ...(!href && { sx: { color: 'text.disabled' } }),
        },
        type: 'h6',
      },
      {
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxLines: 2,
          ...(!href && { sx: { color: 'text.disabled' } }),
        },
        type: 'caption',
      },
      ...items,
    ],
  }
}

export default renderHeaderMenuBlockItem
