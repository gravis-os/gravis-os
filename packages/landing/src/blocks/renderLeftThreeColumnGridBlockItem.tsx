import { printPaddedNumber } from '@gravis-os/utils'

export interface RenderLeftThreeColumnGridBlockItemProps {
  items: Array<{ fa_icon: string; subtitle: string; title: string }>
  overline?: string
  subtitle?: string
  title: string
}

const renderLeftThreeColumnGridBlockItem = (
  props: RenderLeftThreeColumnGridBlockItemProps
) => {
  const { title, items, overline, subtitle } = props

  return {
    id: title,
    center: false,
    items: [
      { title: overline, type: 'overline' },
      {
        title,
        titleProps: { gutterBottom: true, textAlign: 'left' },
        type: 'h3',
      },
      {
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxWidth: true,
        },
        type: 'subtitle1',
      },
      {
        gridItemProps: {
          xs: 6,
          md: 4,
          sx: { textAlign: { xs: 'center', md: 'left' } },
        },
        gridItems: items.map((item, i) => {
          const { title, fa_icon, subtitle } = item
          return {
            items: [
              {
                title: `fa-4x fa-thin ${fa_icon}`,
                type: 'fa-icon',
              },
              {
                title: printPaddedNumber(i + 1),
                titleProps: {
                  color: 'text.secondary',
                  sx: { mb: 3, mt: 4 },
                },
                type: 'subtitle2',
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
        gridProps: { spacing: 6 },
        sx: { mt: { xs: 5, md: 12 } },
        type: 'grid',
      },
    ],
  }
}

export default renderLeftThreeColumnGridBlockItem
