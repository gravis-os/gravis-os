import { BlockItemProps } from '../web/Block/BlockItem'

export interface RenderHeaderMenuMobileBlockItemProps {
  href?: BlockItemProps['boxProps']['href']
  hrefProps?: BlockItemProps['boxProps']['hrefProps']
  items?: BlockItemProps[]
  slug?: string
  subtitle?: BlockItemProps['title']
  title: BlockItemProps['title']
}

const renderHeaderMenuMobileBlockItem = (
  props: RenderHeaderMenuMobileBlockItemProps
) => {
  const { title, slug, href: injectedHref, hrefProps, items = [] } = props
  const href = injectedHref || (slug && `/${slug}`)

  const hasChildren = Boolean(items?.length)

  return {
    disableContainer: true,
    items: [
      {
        title,
        titleProps: {
          href,
          hrefProps: {
            linkProps: { underline: 'hover', ...hrefProps?.linkProps },
            sx: { display: 'block', ...hrefProps?.sx },
            ...hrefProps,
          },
          sx: {
            ...(hasChildren && { fontWeight: 'bold', mb: 0.5 }),
            ...(!href && { color: 'text.disabled' }),
          },
        },
        type: 'h6',
      },
      ...(items.map((item, i) => ({
        title: item.title,
        key:
          typeof item.title === 'string'
            ? `${item.title}-${i}`
            : `header-menu-mobile-${i}`,
        titleProps: {
          gutterBottom: true,
          href: item.href,
          sx: { mb: 0.5 },
          variant: 'body2',
        },
        type: 'link',
        ...item,
      })) as BlockItemProps[]),
    ],
    py: 0,
    reveal: false,
    sx: { backgroundColor: 'transparent' },
  }
}

export default renderHeaderMenuMobileBlockItem
