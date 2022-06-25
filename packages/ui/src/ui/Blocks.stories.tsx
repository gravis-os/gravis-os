import React from 'react'
import Blocks from './Blocks'
import { MOCK_BLOCK, MOCK_BLOCKS, MOCK_BLOCK_ITEM_TYPES } from '../mocks'
import { BlockItemTypeEnum } from './Block/BlockItem'

export default {
  title: 'ui/Blocks',
  component: Blocks,
  args: {
    items: MOCK_BLOCKS,
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: '#eee' }],
    },
  },
}

const Template = (args) => <Blocks {...args} />

export const Basic = Template.bind({})
Basic.args = {}

export const WingGridWithImageViaRowSpacing = Template.bind({})
WingGridWithImageViaRowSpacing.args = {
  items: [
    {
      spacing: { xs: 5, md: 10 },
      items: [
        {
          type: BlockItemTypeEnum.GRID,
          gridProps: { alignItems: 'center' },
          gridItems: [
            { md: 5, items: [MOCK_BLOCK_ITEM_TYPES.IMAGE] },
            { md: 7, items: MOCK_BLOCK.items },
          ],
        },
        {
          type: BlockItemTypeEnum.GRID,
          gridProps: {
            alignItems: 'center',
            reverse: { xs: true, md: false },
          },
          gridItems: [
            { md: 7, items: MOCK_BLOCK.items },
            { md: 5, items: [MOCK_BLOCK_ITEM_TYPES.IMAGE] },
          ],
        },
        {
          type: BlockItemTypeEnum.GRID,
          gridProps: { alignItems: 'center' },
          gridItems: [
            { md: 5, items: [MOCK_BLOCK_ITEM_TYPES.IMAGE] },
            { md: 7, items: MOCK_BLOCK.items },
          ],
        },
      ],
    },
  ],
}
