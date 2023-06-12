import React from 'react'
import { BlockProps } from '@gravis-os/landing'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export interface RenderRightChecklistBlockProps
  extends Omit<BlockProps, 'items'> {
  overline?: string
  title: string
  subtitle?: string
  items?: Array<{ title: string }>
}

const renderRightChecklistBlock = (props: RenderRightChecklistBlockProps) => {
  const { overline, title, subtitle, items, ...rest } = props

  return {
    key: 'checklist',
    ...rest,
    items: [
      {
        type: 'grid',
        gridProps: { spacing: 4 },
        gridItemProps: {
          sx: { textAlign: { xs: 'center', md: 'left' } },
        },
        gridItems: [
          {
            md: 7,
            items: [
              { type: 'overline', title: overline },
              {
                type: 'h3',
                title,
                titleProps: { gutterBottom: true },
              },
              {
                type: 'body1',
                title: subtitle,
                titleProps: {
                  color: 'text.secondary',
                  maxWidth: true,
                },
              },
            ],
          },
          {
            md: 5,
            items: [
              {
                type: 'list',
                title: items?.map((item) => {
                  const { title } = item
                  return {
                    key: title,
                    title,
                    titleProps: { variant: 'subtitle2' },
                    startIcon: <CheckCircleIcon />,
                  }
                }),
              },
            ],
          },
        ],
      },
    ],
  }
}

export default renderRightChecklistBlock
