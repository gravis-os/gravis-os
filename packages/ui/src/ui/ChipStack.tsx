import React from 'react'
import Chip, { ChipProps } from './Chip'
import Stack, { StackProps } from './Stack'

export interface ChipStackProps extends StackProps {
  items?: ChipProps[]
}

const ChipStack: React.FC<ChipStackProps> = props => {
  const { items, ...rest } = props

  if (!items?.length) return null

  return (
    <Stack direction="row" alignItems="center" spacing={1} {...rest}>
      {items.map(item => (
        <Chip key={item.key} {...item} />
      ))}
    </Stack>
  )
}

export default ChipStack
