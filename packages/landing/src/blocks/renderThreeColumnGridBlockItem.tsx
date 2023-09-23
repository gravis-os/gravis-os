import { BlockItemProps } from '../web/Block/BlockItem'

export interface RenderThreeColumnGridBlockItemProps extends BlockItemProps {
  items: Array<{ fa_icon: string; subtitle: string; title: string }>
}

const renderThreeColumnGridBlockItem = (
  props: RenderThreeColumnGridBlockItemProps
) => {
  const { items, ...rest } = props

  return {
    gridProps: { rowSpacing: 8, spacing: 4 },
    sx: { mt: { xs: 5, md: 12 } },
    type: 'grid',
    ...rest,
    gridItemProps: {
      xs: 6,
      md: 4,
      sx: { textAlign: { xs: 'center', md: 'left' } },
    },
    gridItems: items.map((item) => {
      const { title, fa_icon, subtitle } = item
      return {
        items: [
          {
            title: `fa-3x fa-thin ${fa_icon}`,
            titleProps: { sx: { mb: 3 } },
            type: 'fa-icon',
          },
          {
            title,
            titleProps: { gutterBottom: true },
            type: 'subtitle2',
          },
          {
            title: subtitle,
            titleProps: { color: 'text.secondary' },
            type: 'body1',
          },
        ],
      }
    }),
  }
}

export default renderThreeColumnGridBlockItem
