import { Industry } from '@gravis-os/types'

export interface RenderFeaturedIndustryBlockItemProps {
  item: Industry & { href: string }
}

const renderFeaturedIndustryBlockItem = (
  props: RenderFeaturedIndustryBlockItemProps
) => {
  const { item } = props
  const { title, href, subtitle, fa_icon } = item || {}

  return [
    {
      type: 'fa-icon',
      title: `fa-3x fa-thin ${fa_icon}`,
      titleProps: { sx: { mb: 3 } },
    },
    { type: 'link', title, titleProps: { href, variant: 'h5' } },
    {
      type: 'body1',
      title: subtitle,
      titleProps: {
        maxLines: 3,
        sx: { mt: 1, mb: 2 },
        color: 'text.secondary',
      },
    },
    {
      type: 'link',
      title: 'Learn more',
      titleProps: { href, rightCaret: true, variant: 'body2' },
    },
  ]
}

export default renderFeaturedIndustryBlockItem
