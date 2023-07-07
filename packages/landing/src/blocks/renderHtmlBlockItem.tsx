import { BlockProps } from '../web/Block/Block'

export interface RenderHtmlBlockItemProps extends Omit<BlockProps, 'items'> {
  html: string
}

const renderHtmlBlockItem = (props: RenderHtmlBlockItemProps) => {
  const { html, ...rest } = props
  return {
    items: [
      {
        type: 'html',
        title: html,
        titleProps: {
          sx: {
            '& h1, & h2, & h3, & h4, & h5, & h6': { mt: 0, mb: 0.5 },
            '& p + h1, & p + h2, & p + h3, & p + h4, & p + h5, & p + h6': {
              mt: 5,
            },
            '& h1': {
              fontFamily: 'h1.fontFamily',
              fontWeight: 'h1.fontWeight',
            },
            '& h2': {
              fontFamily: 'h2.fontFamily',
              fontWeight: 'h2.fontWeight',
            },
            '& h3': {
              fontFamily: 'h3.fontFamily',
              fontWeight: 'h3.fontWeight',
            },
            '& h4': {
              fontFamily: 'h4.fontFamily',
              fontWeight: 'h4.fontWeight',
            },
            '& h5': {
              fontFamily: 'h5.fontFamily',
              fontWeight: 'h5.fontWeight',
            },
            '& h6': {
              fontFamily: 'h6.fontFamily',
              fontWeight: 'h6.fontWeight',
            },
            '& p': { mt: 0, mb: 3 },
            '& blockquote': { borderLeft: 4, pl: 4, ml: 0, opacity: 0.8 },
            fontSize: {
              xs: 'subtitle2.fontSize',
              md: 'subtitle1.fontSize',
            },
            fontWeight: {
              xs: 'subtitle2.fontWeight',
              md: 'subtitle1.fontWeight',
            },
          },
        },
        ...rest,
      },
    ],
  }
}

export default renderHtmlBlockItem
