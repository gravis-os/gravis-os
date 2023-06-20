import React from 'react'
import { CrudItem } from '@gravis-os/types'
import BlockItem from '../web/Block/BlockItem'

export interface renderBrandBlockItemProps {
  item: CrudItem & { [key: string]: string }
}

const renderBrandBlockItem = (props: renderBrandBlockItemProps) => {
  const { item } = props
  const { slug, title, avatar_src } = item

  const image = {
    type: 'storage_image',
    title: avatar_src,
    titleProps: {
      width: 110,
      height: 110,
    },
    boxProps: {
      sx: { maxWidth: 60 },
      px: 0,
    },
  }

  const text = {
    type: 'body1',
    title,
    titleProps: {
      sx: { fontWeight: 'bold', fontSize: '1.2rem' },
    },
  }

  return [
    {
      type: 'jsx',
      title: (
        <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
          <BlockItem {...image} />
          <BlockItem {...text} />
        </div>
      ),
    },
  ]
}

export default renderBrandBlockItem
