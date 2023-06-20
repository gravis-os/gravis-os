import React from 'react'
import { BlockItemProps } from '../web/Block/BlockItem'
import { BlockProps } from '../web/Block/Block'

export interface RenderBaseColumnGridBlockProps
  extends Omit<BlockProps, 'items' | 'title'> {
  overline?: string
  title: React.ReactNode
  titleProps?: BlockItemProps['titleProps']
  imageProps?: BlockItemProps['titleProps']
  subtitleHref?: string
  subtitle?: string
  items?: Array<{
    avatar_src?: string
    avatar_alt?: string
    fa_icon?: string
    overline?: string
    title: string
    subtitle?: string
    href?: string
  }>
  columns: number
  textAlign?: 'left' | 'center'
}

const renderBaseColumnGridBlock = (props: RenderBaseColumnGridBlockProps) => {
  const {
    overline,
    title,
    titleProps,
    subtitle,
    subtitleHref,
    imageProps,
    items,
    columns,
    textAlign = 'center',
    ...rest
  } = props
  const { center } = rest

  const isTextAlignCenter = textAlign === 'center'

  return {
    items: [
      { type: 'overline', title: overline },
      {
        type: 'h3',
        title,
        titleProps: {
          gutterBottom: true,
          ...(!isTextAlignCenter && { maxWidth: '50%' }),
          ...titleProps,
        },
        ...(isTextAlignCenter && { maxWidth: 'md' }),
      },
      {
        type: subtitleHref ? 'link' : 'body1',
        title: subtitle,
        titleProps: {
          href: subtitleHref,
          color: 'text.secondary',
          maxWidth: isTextAlignCenter ? true : '40%',
        },
        ...(isTextAlignCenter && { maxWidth: 'md' }),
      },
      {
        type: 'grid',
        sx: { mt: { xs: 5, md: 10 } },
        gridProps: { spacing: 4, rowSpacing: 8 },
        gridItemProps: {
          xs: columns <= 3 ? 12 : 6,
          md: 12 / columns,
          sx: { textAlign: { xs: 'center', md: center ? 'center' : 'left' } },
        },
        gridItems: items?.map((item) => {
          const {
            fa_icon,
            overline,
            title,
            subtitle,
            avatar_src,
            avatar_alt,
            href,
          } = item
          return {
            items: [
              avatar_src && {
                type: 'image',
                title: avatar_src,
                titleProps: {
                  alt: avatar_alt,
                  width: 100,
                  height: 100,
                  sx: { mb: 4 },
                  ...imageProps,
                },
              },
              fa_icon && {
                type: 'fa-icon',
                title: `fa-3x fa-thin ${fa_icon}`,
                titleProps: { sx: { mb: 3 } },
              },
              overline && {
                type: 'overline',
                title: overline,
                titleProps: { gutterBottom: true, marginTop: 2 },
              },
              {
                type: href ? 'link' : 'subtitle2',
                title,
                titleProps: {
                  ...(href && { href, variant: 'subtitle2' }),
                  gutterBottom: true,
                },
              },
              subtitle && {
                type: 'body1',
                title: subtitle,
                titleProps: { color: 'text.secondary' },
              },
              href && {
                type: 'link',
                title: 'Learn More',
                titleProps: {
                  ...{ href, mt: 2, rightCaret: true, variant: 'body2' },
                },
              },
            ],
          }
        }),
      },
    ],
    ...rest,
    center: isTextAlignCenter,
  }
}

export default renderBaseColumnGridBlock
