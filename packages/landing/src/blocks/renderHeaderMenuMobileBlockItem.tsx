import { BlockItemProps } from '../web/Block/BlockItem'

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

  const hasChildren = Boolean(items?.length)

  return {
    py: 0,
    reveal: false,
    disableContainer: true,
    sx: { backgroundColor: 'transparent' },
    items: [
      {
        type: 'h6',
        title,
        titleProps: {
          href,
          hrefProps: {
            sx: { display: 'block', ...hrefProps?.sx },
            linkProps: { underline: 'hover', ...hrefProps?.linkProps },
            ...hrefProps,
          },
          sx: {
            ...(hasChildren && { mb: 0.5, fontWeight: 'bold' }),
            ...(!href && { color: 'text.disabled' }),
          },
        },
      },
      ...(items.map((item, i) => ({
        key:
          typeof item.title === 'string'
            ? `${item.title}-${i}`
            : `header-menu-mobile-${i}`,
        type: 'link',
        title: item.title,
        titleProps: {
          href: item.href,
          variant: 'body2',
          gutterBottom: true,
          sx: { mb: 0.5 },
        },
        ...item,
      })) as BlockItemProps[]),
    ],
  }
}

export default renderHeaderMenuMobileBlockItem
