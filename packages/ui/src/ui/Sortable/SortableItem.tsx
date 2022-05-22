import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Item, { ItemProps } from './Item'
import { Position } from './constants'
import { ItemInterface } from './Sortable'

export type SortableItemProps = ItemProps & {
  activeIndex: number
  item: ItemInterface
}

const SortableItem = (props: SortableItemProps) => {
  const { id, activeIndex, ...rest } = props

  // Init sortable
  const sortable = useSortable({
    id,
    animateLayoutChanges: () => true,
  })
  const {
    attributes,
    listeners,
    index,
    isDragging,
    isSorting,
    over,
    setNodeRef,
    transform,
    transition,
  } = sortable

  const position = index > activeIndex ? Position.After : Position.Before
  const insertPosition = over?.id === id && position

  return (
    <Item
      id={id}
      ref={setNodeRef}
      sortable={sortable}
      active={isDragging}
      style={{
        transition,
        transform: isSorting ? undefined : CSS.Translate.toString(transform),
      }}
      insertPosition={insertPosition}
      {...rest}
      {...attributes}
      {...listeners}
    />
  )
}

export default SortableItem
