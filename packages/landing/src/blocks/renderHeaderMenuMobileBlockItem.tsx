import { BlockItemProps } from '@gravis-os/landing'

export interface RenderHeaderMenuMobileBlockItemProps {
  title: BlockItemProps['title']
  slug?: string
  subtitle?: BlockItemProps['title']
  href?: BlockItemProps['boxProps']['href']
  hrefProps?: BlockItemProps['boxProps']['hrefProps']
  items?: BlockItemProps[]
}

const renderHeaderMenuMobileBlockItem = (
  props: RenderHeaderMenuMobileBlockItemProps
) => {
  const { slug, href: injectedHref, hrefProps, title, items = [] } = props
  const href = injectedHref || (slug && `/${slug}`)
  return {
    py: 0,
    reveal: false,
    disableContainer: true,
    sx: { backgroundColor: 'transparent' },
    boxProps: {
      href,
      hrefProps,
      sx: {
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
        type: 'h7',
        title,
        titleProps: {
          mb: 0.5,
          href,
          hrefProps: {
            sx: { display: 'block' },
            linkProps: { underline: 'hover' },
          },
          sx: {
            ...(!href && { color: 'text.disabled' }),
          },
        },
      },
      ...items,
    ],
  }
}

export default renderHeaderMenuMobileBlockItem
