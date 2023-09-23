import { BlockItemProps } from '../web/Block/BlockItem'

export interface RenderClientLogoCardBlockItemProps {
  title: BlockItemProps['title']
  titleProps?: BlockItemProps['titleProps']
}

const renderClientLogoCardBlockItem = (
  props: RenderClientLogoCardBlockItemProps
) => {
  const { title, titleProps } = props

  return {
    boxProps: {
      center: true,
      sx: {
        backgroundColor: 'background.paper',
        lineHeight: 1,
        minHeight: { xs: 150, md: 260 },
        p: 3,
      },
    },
    items: [
      {
        title,
        titleProps,
        type: 'image',
      },
    ],
  }
}

export default renderClientLogoCardBlockItem
