import React from 'react'
import { UniqueIdentifier, useDndContext } from '@dnd-kit/core'
import { isKeyboardEvent } from '@dnd-kit/utilities'
import Item, { ItemProps } from './Item'
import { SortablePosition } from './constants'
import { ItemInterface } from './Sortable'

export type OverlayItemsProps = Omit<ItemProps, 'index'> & {
  sortKeys: UniqueIdentifier[]
  item: ItemInterface
}

const OverlayItem = (props: OverlayItemsProps) => {
  const { id, sortKeys, ...rest } = props
  const { activatorEvent, over } = useDndContext()
  const isKeyboardSorting = isKeyboardEvent(activatorEvent)
  const activeIndex = sortKeys.indexOf(id)
  const overIndex = over?.id ? sortKeys.indexOf(over?.id) : -1
  const hasInsertPosition = isKeyboardSorting && overIndex !== activeIndex
  const position =
    overIndex > activeIndex ? SortablePosition.After : SortablePosition.Before
  const insertPosition = hasInsertPosition && position

  return <Item id={id} {...rest} clone insertPosition={insertPosition} />
}

export default OverlayItem
