import { printPaddedNumber } from '@gravis-os/utils'

export interface RenderLeftFourColumnGridBlockItemProps {
  overline?: string
  title: string
  subtitle?: string
  items?: Array<{ fa_icon?: string; title: string; subtitle?: string }>
}

const renderLeftFourColumnGridBlockItem = (
  props: RenderLeftFourColumnGridBlockItemProps
) => {
  const { overline, title, subtitle, items } = props

  return {
    id: title,
    center: false,
    items: [
      { type: 'overline', title: overline },
      {
        type: 'h3',
        title,
        titleProps: { gutterBottom: true, textAlign: 'left' },
      },
      {
        type: 'subtitle1',
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxWidth: '70%',
        },
      },
      {
        type: 'grid',
        sx: { mt: { xs: 5, md: 10 } },
        gridProps: { spacing: 6 },
        gridItemProps: {
          xs: 6,
          md: 3,
          sx: { textAlign: { xs: 'center', md: 'left' } },
        },
        gridItems: items.map((item, i) => {
          const { fa_icon, title, subtitle } = item
          return {
            items: [
              {
                type: 'fa-icon',
                title: `fa-4x fa-thin ${fa_icon}`,
              },
              {
                type: 'subtitle2',
                title: printPaddedNumber(i + 1),
                titleProps: {
                  color: 'text.secondary',
                  sx: { mt: 4, mb: 3 },
                },
              },
              {
                type: 'subtitle2',
                title,
                titleProps: { gutterBottom: true },
              },
              {
                type: 'body1',
                title: subtitle,
                titleProps: { color: 'text.secondary' },
              },
            ],
          }
        }),
      },
    ],
  }
}

export default renderLeftFourColumnGridBlockItem
