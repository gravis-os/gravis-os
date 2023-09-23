import React from 'react'

import { BlockProps } from '../web/Block/Block'
import { BlockItemProps } from '../web/Block/BlockItem'

export interface RenderBaseColumnGridBlockProps
  extends Omit<BlockProps, 'items' | 'title'> {
  columns: number
  imageProps?: BlockItemProps['titleProps']
  items?: Array<{
    avatar_alt?: string
    avatar_src?: string
    fa_icon?: string
    href?: string
    overline?: string
    subtitle?: string
    title: string
  }>
  overline?: string
  subtitle?: string
  subtitleHref?: string
  textAlign?: 'center' | 'left'
  title: React.ReactNode
  titleProps?: BlockItemProps['titleProps']
}

const renderBaseColumnGridBlock = (props: RenderBaseColumnGridBlockProps) => {
  const {
    title,
    columns,
    imageProps,
    items,
    overline,
    subtitle,
    subtitleHref,
    textAlign = 'center',
    titleProps,
    ...rest
  } = props
  const { center } = rest

  const isTextAlignCenter = textAlign === 'center'

  return {
    items: [
      { title: overline, type: 'overline' },
      {
        title,
        titleProps: {
          gutterBottom: true,
          ...(!isTextAlignCenter && { maxWidth: '50%' }),
          ...titleProps,
        },
        type: 'h3',
        ...(isTextAlignCenter && { maxWidth: 'md' }),
      },
      {
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          href: subtitleHref,
          maxWidth: isTextAlignCenter ? true : '40%',
        },
        type: subtitleHref ? 'link' : 'body1',
        ...(isTextAlignCenter && { maxWidth: 'md' }),
      },
      {
        gridItemProps: {
          xs: columns <= 3 ? 12 : 6,
          md: 12 / columns,
          sx: { textAlign: { xs: 'center', md: center ? 'center' : 'left' } },
        },
        gridItems: items?.map((item) => {
          const {
            title,
            avatar_alt,
            avatar_src,
            fa_icon,
            href,
            overline,
            subtitle,
          } = item
          return {
            items: [
              avatar_src && {
                title: avatar_src,
                titleProps: {
                  alt: avatar_alt,
                  height: 100,
                  sx: { mb: 4 },
                  width: 100,
                  ...imageProps,
                },
                type: 'image',
              },
              fa_icon && {
                title: `fa-3x fa-thin ${fa_icon}`,
                titleProps: { sx: { mb: 3 } },
                type: 'fa-icon',
              },
              overline && {
                title: overline,
                titleProps: { gutterBottom: true, marginTop: 2 },
                type: 'overline',
              },
              {
                title,
                titleProps: {
                  ...(href && { href, variant: 'subtitle2' }),
                  gutterBottom: true,
                },
                type: href ? 'link' : 'subtitle2',
              },
              subtitle && {
                title: subtitle,
                titleProps: { color: 'text.secondary' },
                type: 'body1',
              },
              href && {
                title: 'Learn More',
                titleProps: {
                  href,
                  mt: 2,
                  rightCaret: true,
                  variant: 'body2',
                },
                type: 'link',
              },
            ],
          }
        }),
        gridProps: { rowSpacing: 8, spacing: 4 },
        sx: { mt: { xs: 5, md: 10 } },
        type: 'grid',
      },
    ],
    ...rest,
    center: isTextAlignCenter,
  }
}

export default renderBaseColumnGridBlock
