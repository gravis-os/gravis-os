import { BlockItemProps } from 'src/web'

export interface RenderClientLogoCardBlockItemProps {
  title: BlockItemProps['title']
  titleProps?: BlockItemProps['titleProps']
}

const renderClientLogoCardBlockItem = (
  props: RenderClientLogoCardBlockItemProps
) => {
  const { title, titleProps } = props

  return {
    items: [
      {
        type: 'image',
        title,
        titleProps,
      },
    ],
    boxProps: {
      sx: {
        backgroundColor: 'background.paper',
        p: 3,
        minHeight: { xs: 200, md: 260 },
        lineHeight: 1,
      },
      center: true,
    },
  }
}

export default renderClientLogoCardBlockItem
