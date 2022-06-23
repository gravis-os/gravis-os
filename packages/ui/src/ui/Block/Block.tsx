import React from 'react'
import BlockItem, { BlockItemProps } from './BlockItem'
import { ContainerProps } from '../Container'
import Box, { BoxProps } from '../Box'

export interface BlockProps extends Omit<BoxProps, 'maxWidth'> {
  items: BlockItemProps[]
  maxWidth?: ContainerProps['maxWidth']
  containerProps?: ContainerProps
}

const Block: React.FC<BlockProps> = (props) => {
  const { items, sx, maxWidth, containerProps, ...rest } = props

  return (
    <Box
      reveal
      sx={{
        py: { xs: 5, md: 15 },
        backgroundColor: 'background.paper',
        ...sx,
      }}
      {...rest}
    >
      <>
        {items.map((item, i) => {
          return (
            <BlockItem
              key={`block-item-${i}`}
              maxWidth={maxWidth}
              containerProps={containerProps}
              {...item}
            />
          )
        })}
      </>
    </Box>
  )
}

export default Block
