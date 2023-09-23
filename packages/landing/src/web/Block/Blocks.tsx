import React from 'react'

import Block, { BlockProps } from './Block'

export interface BlocksProps {
  items: BlockProps[]
}

const Blocks: React.FC<BlocksProps> = (props) => {
  const { items } = props

  if (!items) return null

  return (
    <>
      {items.filter(Boolean).map((item, i) => {
        const key = item.id || `block-item-${i}`
        return <Block key={key} {...item} />
      })}
    </>
  )
}

export default Blocks
