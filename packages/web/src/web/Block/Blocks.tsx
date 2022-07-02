import React from 'react'
import Block, { BlockProps } from './index'

export interface BlocksProps {
  items: BlockProps[]
}

const Blocks: React.FC<BlocksProps> = (props) => {
  const { items } = props

  if (!items) return null

  return (
    <>
      {items.map((item, i) => {
        return <Block key={`block-${i}`} {...item} />
      })}
    </>
  )
}

export default Blocks
