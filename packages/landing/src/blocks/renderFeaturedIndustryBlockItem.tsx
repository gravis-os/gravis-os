import { Industry } from '@gravis-os/types'

export interface RenderFeaturedIndustryBlockItemProps {
  disableHref?: boolean
  item: Industry & { href: string }
}

const renderFeaturedIndustryBlockItem = (
  props: RenderFeaturedIndustryBlockItemProps
) => {
  const { disableHref, item } = props
  const { title, fa_icon, href, subtitle } = item || {}

  const hasHref = !disableHref && href

  return [
    {
      title: `fa-3x fa-thin ${fa_icon}`,
      titleProps: { sx: { mb: 3 } },
      type: 'fa-icon',
    },
    {
      title,
      titleProps: { href, variant: 'h5' },
      type: hasHref ? 'link' : 'h5',
    },
    {
      title: subtitle,
      titleProps: {
        color: 'text.secondary',
        maxLines: 3,
        sx: { mb: 2, mt: 1 },
      },
      type: 'body1',
    },
    hasHref && {
      title: 'Learn more',
      titleProps: { href, rightCaret: true, variant: 'body2' },
      type: 'link',
    },
  ]
}

export default renderFeaturedIndustryBlockItem
