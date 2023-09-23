import { BlockProps } from '../web/Block/Block'

export interface RenderParagraphBlockItemProps
  extends Omit<BlockProps, 'items'> {
  items?: Array<{ title: string }>
  title: string
}

const renderParagraphBlockItem = (props: RenderParagraphBlockItemProps) => {
  const { title, items, ...rest } = props
  return {
    id: 'paragraph',
    ...rest,
    items: [
      {
        title,
        titleProps: { sx: { mb: 4 } },
        type: 'h4',
      },
      ...items?.map(({ title }) => ({
        title,
        titleProps: { maxWidth: '70%', sx: { mb: 3 } },
        type: 'subtitle3',
      })),
    ],
  }
}

export default renderParagraphBlockItem
