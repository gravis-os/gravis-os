import React from 'react'

import Box from './Box'
import Chip, { ChipProps } from './Chip'
import { StackProps } from './Stack'

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
        '& .MuiChip-root': {
          marginBottom: spacingX,
          marginRight: spacingY,
          marginTop: spacingY,
        },
        marginBottom: -spacingX,
        marginTop: -spacingY,
      }}
    >
      {items.map((item) => (
        <Chip key={item.key} {...item} />
      ))}
    </Box>
  )
}

export default ChipStack
