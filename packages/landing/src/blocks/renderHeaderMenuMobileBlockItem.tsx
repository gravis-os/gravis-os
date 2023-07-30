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
  return {
    py: 0,
    reveal: false,
    disableContainer: true,
    sx: { backgroundColor: 'transparent' },
    items: [
      {
        type: 'h7',
        title,
        titleProps: {
          mb: 2,
          href,
          hrefProps: {
            sx: { display: 'block', ...hrefProps?.sx },
            linkProps: { underline: 'hover', ...hrefProps?.linkProps },
            ...hrefProps,
          },
          sx: {
            ...(!href && { color: 'text.disabled' }),
          },
        },
      },
      ...(items.map((item) => ({
        type: 'link',
        title: item.title,
        titleProps: {
          href: item.href,
          variant: 'body2',
          gutterBottom: true,
        },
        ...item,
      })) as BlockItemProps[]),
    ],
  }
}

export default renderHeaderMenuMobileBlockItem
