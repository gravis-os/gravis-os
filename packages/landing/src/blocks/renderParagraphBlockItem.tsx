import { BlockProps } from '../web/Block/Block'

export interface RenderParagraphBlockItemProps
  extends Omit<BlockProps, 'items'> {
  title: string
  items?: Array<{ title: string }>
}

const renderParagraphBlockItem = (props: RenderParagraphBlockItemProps) => {
  const { title, items, ...rest } = props
  return {
    id: 'paragraph',
    ...rest,
    items: [
      {
        type: 'h4',
        title,
        titleProps: { sx: { mb: 4 } },
      },
      ...items?.map(({ title }) => ({
        type: 'subtitle3',
        title,
        titleProps: { sx: { mb: 3 }, maxWidth: '70%' },
      })),
    ],
  }
}

export default renderParagraphBlockItem
