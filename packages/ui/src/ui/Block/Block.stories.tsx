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
  center: true,
  items: [
    ...MOCK_BLOCK.items,
    {
      sx: { mt: 10 },
      gridProps: { spacing: { xs: 5, md: 20 } },
      gridItems: [
        {
          sx: { textAlign: 'left' },
          items: [
            ...MOCK_BLOCK.items,
            { sx: { mt: 2 }, ...MOCK_BLOCK_ITEM_TYPES.BODY },
          ],
        },
        {
          sx: { textAlign: 'left' },
          items: [
            ...MOCK_BLOCK.items,
            { sx: { mt: 2 }, ...MOCK_BLOCK_ITEM_TYPES.BODY },
          ],
        },
      ],
    },
  ],
}

export const GridWithFeatures = Template.bind({})
GridWithFeatures.args = {
  center: true,
  items: [
    ...MOCK_BLOCK.items,
    {
      sx: { mt: { xs: 5, md: 10 } },
      gridProps: { spacing: { xs: 5, md: 10 } },
      gridItems: [
        {
          sx: { textAlign: { xs: 'center', md: 'left' } },
          items: [
            { ...MOCK_BLOCK_ITEM_TYPES.H5, titleProps: { gutterBottom: true } },
            MOCK_BLOCK_ITEM_TYPES.BODY,
          ],
        },
        {
          sx: { textAlign: { xs: 'center', md: 'left' } },
          items: [
            { ...MOCK_BLOCK_ITEM_TYPES.H5, titleProps: { gutterBottom: true } },
            MOCK_BLOCK_ITEM_TYPES.BODY,
          ],
        },
        {
          sx: { textAlign: { xs: 'center', md: 'left' } },
          items: [
            { ...MOCK_BLOCK_ITEM_TYPES.H5, titleProps: { gutterBottom: true } },
            MOCK_BLOCK_ITEM_TYPES.BODY,
          ],
        },
      ],
    },
  ],
}

export const HalfGrid = Template.bind({})
HalfGrid.args = {
  items: [
    {
      gridItems: [
        {
          sx: { textAlign: 'right' },
          items: [...MOCK_BLOCK.items],
        },
        {
          sx: { textAlign: 'left' },
          items: [...MOCK_BLOCK.items],
        },
      ],
    },
  ],
}

export const LeftWingGrid = Template.bind({})
LeftWingGrid.args = {
  items: [
    {
      gridItems: [
        { md: 7, items: MOCK_BLOCK.items },
        { md: 5, items: MOCK_BLOCK.items },
      ],
    },
  ],
}

export const RightWingGrid = Template.bind({})
RightWingGrid.args = {
  items: [
    {
      gridItems: [
        { md: 5, items: MOCK_BLOCK.items },
        { md: 7, items: MOCK_BLOCK.items },
      ],
    },
  ],
}
