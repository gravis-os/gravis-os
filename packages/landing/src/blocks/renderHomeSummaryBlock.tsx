import { BlockProps } from '../web/Block/Block'
import { BlockItemProps } from '../web/Block/BlockItem'

export interface RenderHomeSummaryBlockProps extends Omit<BlockProps, 'title'> {
  title: BlockItemProps['title']
  titleProps?: BlockItemProps['titleProps']
}

const renderHomeSummaryBlock = (props: RenderHomeSummaryBlockProps) => {
  const { title, titleProps, sx, ...rest } = props

  return {
    key: 'home-summary',
    sx: { backgroundColor: 'background.paper', ...sx },
    pt: { xs: 5, md: 10 },
    pb: { xs: 5, md: 10 },
    ...rest,
    items: [
      {
        type: 'h4',
        title,
        titleProps: { maxWidth: true, ...titleProps },
      },
    ],
  }
}

export default renderHomeSummaryBlock
