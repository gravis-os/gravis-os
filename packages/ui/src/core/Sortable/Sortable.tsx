'use client'
import type {
  DragEndEvent,
  DragStartEvent,
  MeasuringConfiguration,
  UniqueIdentifier,
} from '@dnd-kit/core'

import React, { useEffect, useState } from 'react'

import {
  DndContext,
  DragOverlay,
  DropAnimation,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  closestCenter,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'

import Box from '../Box'
import { SortableLayout } from './constants'
import createRange from './createRange'
import { ItemProps } from './Item'
import OverlayItem from './OverlayItem'
import SortableItem from './SortableItem'

const measuring: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
}
const dropAnimation: DropAnimation = {
  keyframes({ transform }) {
    return [
      { transform: CSS.Transform.toString(transform.initial) },
      {
        transform: CSS.Transform.toString({
          scaleX: 0.98,
          scaleY: 0.98,
          x: transform.final.x - 10,
          y: transform.final.y - 10,
        }),
      },
    ]
  },
  sideEffects: defaultDropAnimationSideEffects({
    className: {
      active: 'active',
    },
  }),
}
const defaultItems: any = createRange(20, (index) => ({
  id: `${index + 1}`,
  title: `${index + 1}`,
}))

export type ItemInterface = {
  id?: UniqueIdentifier
} & Record<string, unknown>

export interface SortableProps {
  disabled?: boolean
  items?: [] | ItemInterface[]
  layout: SortableLayout
  renderItem?: ItemProps['renderItem']
  setSortKeys?: React.Dispatch<React.SetStateAction<any>>
  sortKeys?: UniqueIdentifier[]
  spacing?: number // Grid gap
}

const getSortKeysFromItems = (items) => items.map(({ id }) => String(id))

const Sortable = (props: SortableProps) => {
  const {
    disabled,
    items = defaultItems,
    layout,
    renderItem,
    setSortKeys: injectedSetSortKeys,
    sortKeys: injectedSortKeys,
    spacing = 2,
  } = props

  // States
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [localSortKeys, setLocalSortKeys] = useState<UniqueIdentifier[]>(() =>
    getSortKeysFromItems(items)
  )

  // Update state when items change
  useEffect(() => {
    if (items) setLocalSortKeys(getSortKeysFromItems(items))
  }, [items])

  // Allow external state to override the internal state to lift the state up
  const sortKeys = injectedSortKeys || localSortKeys
  const setSortKeys = injectedSetSortKeys || setLocalSortKeys

  // Vars
  const activeIndex = activeId ? sortKeys.indexOf(activeId) : -1
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  // Methods
  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id)
  }
  const handleDragCancel = () => {
    setActiveId(null)
  }
  const handleDragEnd = ({ over }: DragEndEvent) => {
    if (over) {
      const overIndex = sortKeys.indexOf(over.id)

      if (activeIndex !== overIndex) {
        const newIndex = overIndex

        setSortKeys((sortKeys) => arrayMove(sortKeys, activeIndex, newIndex))
      }
    }

    setActiveId(null)
  }
  const handleRemoveItem = (id: UniqueIdentifier) =>
    setSortKeys((sortKeys) => sortKeys.filter((itemId) => itemId !== id))

  return (
    <Box
      sx={{
        '& .Sortable': {
          '&.grid': {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          },
          '&.horizontal': {
            gridAutoColumns: 'max-content',
            gridAutoFlow: 'column',
          },
          display: 'grid',
          gap: spacing,
          margin: 0,
          padding: 0,
        },
      }}
    >
      <DndContext
        collisionDetection={closestCenter}
        measuring={measuring}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        sensors={sensors}
      >
        <SortableContext items={sortKeys}>
          <ul className={clsx('Sortable', layout)}>
            {sortKeys.map((id, index) => (
              <SortableItem
                activeIndex={activeIndex}
                disabled={disabled}
                id={id}
                index={index + 1}
                item={items.find((item) => String(item.id) === String(id))}
                key={id}
                layout={layout}
                onRemove={() => handleRemoveItem(id)}
                renderItem={renderItem}
              />
            ))}
          </ul>
        </SortableContext>

        <DragOverlay dropAnimation={dropAnimation}>
          {activeId && (
            <OverlayItem
              id={activeId}
              item={items.find(({ id }) => String(id) === String(activeId))}
              layout={layout}
              renderItem={renderItem}
              sortKeys={sortKeys}
            />
          )}
        </DragOverlay>
      </DndContext>
    </Box>
  )
}

export default Sortable
