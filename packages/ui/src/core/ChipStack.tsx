import React from 'react'
import Chip, { ChipProps } from './Chip'
import Stack, { StackProps } from './Stack'
import Box, { BoxProps } from './Box'

export interface ChipStackProps extends StackProps {
  items?: ChipProps[]
  spacing?: number
}

const ChipStack: React.FC<ChipStackProps> = (props) => {
  const { items, spacing = 1, ...rest } = props

  if (!items?.length) return null

  const spacingY = spacing / 2
  const spacingX = spacing / 4

  return (
    <Box
      sx={{
        marginTop: -spacingY,
        marginBottom: -spacingX,
        '& .MuiChip-root': {
          marginTop: spacingY,
          marginRight: spacingY,
          marginBottom: spacingX,
        },
      }}
    >
      {items.map((item) => (
        <Chip key={item.key} {...item} />
      ))}
    </Box>
  )
}

export default ChipStack
