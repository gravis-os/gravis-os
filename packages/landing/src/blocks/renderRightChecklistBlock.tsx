import React from 'react'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import { BlockProps } from '../web/Block/Block'

export interface RenderRightChecklistBlockProps
  extends Omit<BlockProps, 'items'> {
  items?: Array<{ title: string }>
  overline?: string
  subtitle?: string
  title: string
}

const renderRightChecklistBlock = (props: RenderRightChecklistBlockProps) => {
  const { title, items, overline, subtitle, ...rest } = props

  return {
    id: 'checklist',
    ...rest,
    items: [
      {
        gridItemProps: {
          sx: { textAlign: { xs: 'center', md: 'left' } },
        },
        gridItems: [
          {
            md: 7,
            items: [
              { title: overline, type: 'overline' },
              {
                title,
                titleProps: { gutterBottom: true },
                type: 'h3',
              },
              {
                title: subtitle,
                titleProps: {
                  color: 'text.secondary',
                  maxWidth: true,
                },
                type: 'body1',
              },
            ],
          },
          {
            md: 5,
            items: [
              {
                title: items?.map((item) => {
                  const { title } = item
                  return {
                    id: title,
                    title,
                    startIcon: <CheckCircleIcon />,
                    titleProps: { variant: 'subtitle2' },
                  }
                }),
                type: 'list',
              },
            ],
          },
        ],
        gridProps: { spacing: 4 },
        type: 'grid',
      },
    ],
  }
}

export default renderRightChecklistBlock
