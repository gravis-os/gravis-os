import React from 'react'
import Block from './Block'
import { MOCK_BLOCK, MOCK_BLOCK_ITEM_TYPES } from '../../mocks'
import { BlockItemTypeEnum } from './BlockItem'

export default {
  title: 'ui/Block',
  component: Block,
  args: MOCK_BLOCK,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#eee',
        },
      ],
    },
  },
}

const Template = (args) => <Block {...args} />

export const Basic = Template.bind({})
Basic.args = {}

export const Center = Template.bind({})
Center.args = { center: true, maxWidth: 'sm' }

export const DynamicContent = Template.bind({})
DynamicContent.args = {
  items: [
    ...MOCK_BLOCK.items,
    {
      type: BlockItemTypeEnum.OVERLINE,
      title: 'Custom Business Software Made for Market Leaders',
      sx: { mt: 2 },
    },
  ],
}

export const Grid = Template.bind({})
Grid.args = {
  items: [
    ...MOCK_BLOCK.items,
    {
      sx: { mt: 5 },
      gridProps: { spacing: { xs: 5, md: 15 } },
      gridItems: [
        {
          center: true,
          items: [
            ...MOCK_BLOCK.items,
            { sx: { mt: 2 }, ...MOCK_BLOCK_ITEM_TYPES.BODY },
          ],
        },
        {
          items: [
            ...MOCK_BLOCK.items,
            { sx: { mt: 2 }, ...MOCK_BLOCK_ITEM_TYPES.BODY },
          ],
        },
      ],
    },
  ],
}
