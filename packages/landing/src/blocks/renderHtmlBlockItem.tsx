import { BlockProps } from '../web/Block/Block'

export interface RenderHtmlBlockItemProps extends Omit<BlockProps, 'items'> {
  html: string
}

const renderHtmlBlockItem = (props: RenderHtmlBlockItemProps) => {
  const { html, ...rest } = props
  return {
    items: [
      {
        title: html,
        titleProps: {
          sx: {
            '& blockquote': { borderLeft: 4, ml: 0, opacity: 0.8, pl: 4 },
            '& h1': {
              fontFamily: 'h1.fontFamily',
              fontWeight: 'h1.fontWeight',
            },
            '& h1, & h2, & h3, & h4, & h5, & h6': { mb: 0.5, mt: 0 },
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
            '& p': { mb: 3, mt: 0 },
            '& p + h1, & p + h2, & p + h3, & p + h4, & p + h5, & p + h6': {
              mt: 5,
            },
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
        type: 'html',
        ...rest,
      },
    ],
  }
}

export default renderHtmlBlockItem
