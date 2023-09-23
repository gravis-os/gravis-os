import { BlockProps } from '../web/Block/Block'
import { BlockItemProps } from '../web/Block/BlockItem'

export interface RenderHomeSummaryBlockProps extends Omit<BlockProps, 'title'> {
  title: BlockItemProps['title']
  titleProps?: BlockItemProps['titleProps']
}

const renderHomeSummaryBlock = (props: RenderHomeSummaryBlockProps) => {
  const { title, titleProps, ...rest } = props

  return {
    id: 'home-summary',
    pb: { xs: 5, md: 10 },
    pt: { xs: 5, md: 10 },
    ...rest,
    items: [
      {
        title,
        titleProps: { maxWidth: true, ...titleProps },
        type: 'h4',
      },
    ],
  }
}

export default renderHomeSummaryBlock
