import { Industry } from '@gravis-os/types'

export interface RenderFeaturedIndustryBlockItemProps {
  item: Industry & { href: string }
}

const renderFeaturedIndustryBlockItem = (
  props: RenderFeaturedIndustryBlockItemProps
) => {
  const { item } = props
  const { title, fa_icon, href, subtitle } = item || {}

  return [
    {
      title: `fa-3x fa-thin ${fa_icon}`,
      titleProps: { sx: { mb: 3 } },
      type: 'fa-icon',
    },
    { title, titleProps: { href, variant: 'h5' }, type: 'link' },
    {
      title: subtitle,
      titleProps: {
        color: 'text.secondary',
        maxLines: 3,
        sx: { mb: 2, mt: 1 },
      },
      type: 'body1',
    },
    {
      title: 'Learn more',
      titleProps: { href, rightCaret: true, variant: 'body2' },
      type: 'link',
    },
  ]
}

export default renderFeaturedIndustryBlockItem
