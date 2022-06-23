import React from 'react'
import BlockItem, { BlockItemProps } from './BlockItem'
import Container, { ContainerProps } from '../Container'
import Box, { BoxProps } from '../Box'
import Grid from '../Grid'

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
      <Container maxWidth={maxWidth} {...containerProps}>
        {items.map((item, i) => {
          return <BlockItem key={`block-item-${i}`} {...item} />
        })}
      </Container>
    </Box>
  )
}

export default Block
