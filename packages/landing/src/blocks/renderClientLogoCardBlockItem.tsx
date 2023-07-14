import { BlockItemProps } from '../web/Block/BlockItem'

export interface RenderClientLogoCardBlockItemProps {
  title: BlockItemProps['title']
  titleProps?: BlockItemProps['titleProps']
}

const renderClientLogoCardBlockItem = (
  props: RenderClientLogoCardBlockItemProps
) => {
  const { title, titleProps } = props
  console.log('hiiiiii')

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
        minHeight: { xs: 150, md: 260 },
        lineHeight: 1,
      },
      center: true,
    },
  }
}

export default renderClientLogoCardBlockItem
