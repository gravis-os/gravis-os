import React from 'react'
import { ImageMarquee, Stack } from '@gravis-os/ui'
import { getSplitArrayIntoTwo } from '@gravis-os/utils'
import { ClientHighlight } from '@gravis-os/types'
import { BlockProps } from 'src/web'

export interface RenderClientHighlightsImageMarqueeBlockProps
  extends Omit<BlockProps, 'items'> {
  items?: ClientHighlight[]
}

const renderClientHighlightsImageMarqueeBlock = (
  props: RenderClientHighlightsImageMarqueeBlockProps
) => {
  const { items, ...rest } = props

  const [firstRowItems, secondRowItems] =
    getSplitArrayIntoTwo<ClientHighlight>(items)

  return {
    py: 2,
    disableContainer: true,
    dark: true,
    items: [
      {
        type: 'jsx',
        title: (
          <Stack spacing={2}>
            <ImageMarquee
              imageProps={{ rounded: true }}
              items={firstRowItems?.map(({ src, alt }) => ({
                src,
                alt,
              }))}
            />
            <ImageMarquee
              reverse
              imageProps={{ rounded: true }}
              items={secondRowItems?.map(({ src, alt }) => ({
                src,
                alt,
              }))}
            />
          </Stack>
        ),
      },
    ],
    ...rest,
  }
}

export default renderClientHighlightsImageMarqueeBlock
