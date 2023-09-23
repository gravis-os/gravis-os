import React from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { SortablePosition } from './constants'
import Item, { ItemProps } from './Item'
import { ItemInterface } from './Sortable'

export type SortableItemProps = ItemProps & {
  activeIndex: number
  disabled?: boolean
  item: ItemInterface
}

const SortableItem = (props: SortableItemProps) => {
  const { id, activeIndex, disabled = false, ...rest } = props

  // Init sortable
  const sortable = useSortable({
    id,
    animateLayoutChanges: () => true,
    disabled,
  })
  const {
    attributes,
    index,
    isDragging,
    isSorting,
    listeners,
    over,
    setNodeRef,
    transform,
    transition,
  } = sortable

  const position =
    index > activeIndex ? SortablePosition.After : SortablePosition.Before
  const insertPosition = over?.id === id && position

  return (
    <Item
      active={isDragging}
      id={id}
      insertPosition={insertPosition}
      ref={setNodeRef}
      sortable={sortable}
      style={{
        transform: isSorting ? undefined : CSS.Translate.toString(transform),
        transition,
      }}
      {...rest}
      {...attributes}
      {...listeners}
    />
  )
}

export default SortableItem
