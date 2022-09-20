import React from 'react'
import Block from './Block'
import { MOCK_BLOCK, MOCK_BLOCK_ITEM_TYPES } from '../../mocks'
import { BlockItemTypeEnum } from './constants'
import MOCK_RAINBOW_GRADIENT_1_IMAGE from '../../../public/images/mock_rainbow_gradient_1.jpg'
import MOCK_DARK_BLUE_GRADIENT_1_IMAGE from '../../../public/images/mock_dark_blue_gradient_1.jpg'

export default {
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

export const Shorthands = Template.bind({})
Shorthands.args = {
  items: [
    {
      type: BlockItemTypeEnum.H4,
      title: 'This is the extended version (no shorthand)',
    },
    {
      subtitle1: {
        title: 'Subtitle1',
        color: 'success.main',
        mt: 3,
      },
      subtitle2: {
        title: 'Subtitle 2 demonstrated with stacking within the same object',
      },
    },
    { body1: 'Body1 in string syntax' },
    {
      body1: {
        title: 'Body1 second para',
        color: 'error.main',
        mt: 3,
      },
    },
  ],
}

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

export const WithImage = Template.bind({})
WithImage.args = {
  items: [MOCK_BLOCK_ITEM_TYPES.IMAGE, ...MOCK_BLOCK.items],
}

export const BackgroundImage = Template.bind({})
BackgroundImage.args = {
  backgroundImageProps: {
    src: MOCK_RAINBOW_GRADIENT_1_IMAGE,
    alt: 'MOCK_RAINBOW_GRADIENT_1_IMAGE',
  },
}

export const DarkModeWithBackgroundColor = Template.bind({})
DarkModeWithBackgroundColor.args = {
  dark: true,
}

export const DarkModeWithBackgroundImage = Template.bind({})
DarkModeWithBackgroundImage.args = {
  backgroundImageProps: {
    src: MOCK_DARK_BLUE_GRADIENT_1_IMAGE,
    alt: 'MOCK_DARK_BLUE_GRADIENT_1_IMAGE',
  },
  dark: true,
}

export const Grid = Template.bind({})
Grid.args = {
  center: true,
  items: [
    ...MOCK_BLOCK.items,
    {
      type: BlockItemTypeEnum.GRID,
      sx: { mt: 10 },
      gridProps: { spacing: { xs: 5, md: 20 } },
      gridItems: [
        {
          sx: { textAlign: 'left' },
          items: [
            ...MOCK_BLOCK.items,
            { sx: { mt: 2 }, ...MOCK_BLOCK_ITEM_TYPES.BODY1 },
          ],
        },
        {
          sx: { textAlign: 'left' },
          items: [
            ...MOCK_BLOCK.items,
            { sx: { mt: 2 }, ...MOCK_BLOCK_ITEM_TYPES.BODY1 },
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
      type: BlockItemTypeEnum.GRID,
      maxWidth: 'lg',
      sx: { mt: { xs: 5, md: 7.5 } },
      gridProps: { spacing: { xs: 5 } },
      gridItems: [
        {
          sx: { textAlign: { xs: 'center', md: 'left' } },
          items: [
            MOCK_BLOCK_ITEM_TYPES.IMAGE,
            { ...MOCK_BLOCK_ITEM_TYPES.H5, titleProps: { gutterBottom: true } },
            MOCK_BLOCK_ITEM_TYPES.BODY1,
          ],
        },
        {
          sx: { textAlign: { xs: 'center', md: 'left' } },
          items: [
            MOCK_BLOCK_ITEM_TYPES.IMAGE,
            { ...MOCK_BLOCK_ITEM_TYPES.H5, titleProps: { gutterBottom: true } },
            MOCK_BLOCK_ITEM_TYPES.BODY1,
          ],
        },
        {
          sx: { textAlign: { xs: 'center', md: 'left' } },
          items: [
            MOCK_BLOCK_ITEM_TYPES.IMAGE,
            { ...MOCK_BLOCK_ITEM_TYPES.H5, titleProps: { gutterBottom: true } },
            MOCK_BLOCK_ITEM_TYPES.BODY1,
          ],
        },
      ],
    },
  ],
}

export const GridWithIconsOnSingleRow = Template.bind({})
GridWithIconsOnSingleRow.args = {
  center: true,
  items: [
    ...MOCK_BLOCK.items,
    {
      type: BlockItemTypeEnum.GRID,
      sx: { mt: { xs: 5, md: 10 } },
      gridProps: { spacing: { xs: 5 } },
      gridItems: [
        {
          sx: { textAlign: { xs: 'center', md: 'left' } },
          items: [
            MOCK_BLOCK_ITEM_TYPES.ICON,
            { ...MOCK_BLOCK_ITEM_TYPES.H5, titleProps: { gutterBottom: true } },
            MOCK_BLOCK_ITEM_TYPES.BODY1,
          ],
        },
        {
          sx: { textAlign: { xs: 'center', md: 'left' } },
          items: [
            MOCK_BLOCK_ITEM_TYPES.ICON,
            { ...MOCK_BLOCK_ITEM_TYPES.H5, titleProps: { gutterBottom: true } },
            MOCK_BLOCK_ITEM_TYPES.BODY1,
          ],
        },
        {
          sx: { textAlign: { xs: 'center', md: 'left' } },
          items: [
            MOCK_BLOCK_ITEM_TYPES.ICON,
            { ...MOCK_BLOCK_ITEM_TYPES.H5, titleProps: { gutterBottom: true } },
            MOCK_BLOCK_ITEM_TYPES.BODY1,
          ],
        },
        {
          sx: { textAlign: { xs: 'center', md: 'left' } },
          items: [
            MOCK_BLOCK_ITEM_TYPES.ICON,
            { ...MOCK_BLOCK_ITEM_TYPES.H5, titleProps: { gutterBottom: true } },
            MOCK_BLOCK_ITEM_TYPES.BODY1,
          ],
        },
      ],
    },
  ],
}

export const GridWithIconsOnDoubleRow = Template.bind({})
GridWithIconsOnDoubleRow.args = {
  center: true,
  items: [
    ...MOCK_BLOCK.items,
    {
      type: BlockItemTypeEnum.GRID,
      sx: { mt: { xs: 5, md: 10 } },
      gridProps: { spacing: { xs: 5 } },
      gridItems: [
        {
          md: 4,
          sx: { textAlign: { xs: 'center', md: 'left' } },
          items: [
            MOCK_BLOCK_ITEM_TYPES.ICON,
            { ...MOCK_BLOCK_ITEM_TYPES.H5, titleProps: { gutterBottom: true } },
            MOCK_BLOCK_ITEM_TYPES.BODY1,
          ],
        },
        {
          md: 4,
          sx: { textAlign: { xs: 'center', md: 'left' } },
          items: [
            MOCK_BLOCK_ITEM_TYPES.ICON,
            { ...MOCK_BLOCK_ITEM_TYPES.H5, titleProps: { gutterBottom: true } },
            MOCK_BLOCK_ITEM_TYPES.BODY1,
          ],
        },
        {
          md: 4,
          sx: { textAlign: { xs: 'center', md: 'left' } },
          items: [
            MOCK_BLOCK_ITEM_TYPES.ICON,
            { ...MOCK_BLOCK_ITEM_TYPES.H5, titleProps: { gutterBottom: true } },
            MOCK_BLOCK_ITEM_TYPES.BODY1,
          ],
        },
        {
          md: 4,
          sx: { textAlign: { xs: 'center', md: 'left' } },
          items: [
            MOCK_BLOCK_ITEM_TYPES.ICON,
            { ...MOCK_BLOCK_ITEM_TYPES.H5, titleProps: { gutterBottom: true } },
            MOCK_BLOCK_ITEM_TYPES.BODY1,
          ],
        },
        {
          md: 4,
          sx: { textAlign: { xs: 'center', md: 'left' } },
          items: [
            MOCK_BLOCK_ITEM_TYPES.ICON,
            { ...MOCK_BLOCK_ITEM_TYPES.H5, titleProps: { gutterBottom: true } },
            MOCK_BLOCK_ITEM_TYPES.BODY1,
          ],
        },
        {
          md: 4,
          sx: { textAlign: { xs: 'center', md: 'left' } },
          items: [
            MOCK_BLOCK_ITEM_TYPES.ICON,
            { ...MOCK_BLOCK_ITEM_TYPES.H5, titleProps: { gutterBottom: true } },
            MOCK_BLOCK_ITEM_TYPES.BODY1,
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
      type: BlockItemTypeEnum.GRID,
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
      type: BlockItemTypeEnum.GRID,
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
      type: BlockItemTypeEnum.GRID,
      gridItems: [
        { md: 5, items: MOCK_BLOCK.items },
        { md: 7, items: MOCK_BLOCK.items },
      ],
    },
  ],
}
