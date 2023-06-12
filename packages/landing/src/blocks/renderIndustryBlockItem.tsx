import { Industry } from '@gravis-os/types'

export interface RenderIndustryBlockItemProps {
  item: Industry & { href: string }
}

const renderIndustryBlockItem = (props: RenderIndustryBlockItemProps) => {
  const { item } = props
  const { title, subtitle, href, fa_icon } = item || {}

  return {
    sm: 6,
    md: 4,
    lg: 3,
    items: [
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
          maxLines: 2,
          maxWidth: true,
          color: 'text.secondary',
          sx: { mt: 1, mb: 2 },
        },
      },
      {
        type: 'link',
        title: 'Learn more',
        titleProps: { href, rightCaret: true, variant: 'body2' },
      },
    ],
  }
}

export default renderIndustryBlockItem
