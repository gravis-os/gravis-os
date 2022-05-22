import React, { useState } from 'react'
import type {
  DragEndEvent,
  DragStartEvent,
  MeasuringConfiguration,
  UniqueIdentifier,
} from '@dnd-kit/core'
import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  DropAnimation,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import clsx from 'clsx'
import { CSS } from '@dnd-kit/utilities'
import createRange from './createRange'
import { ItemProps } from './Item'
import Box from '../Box'
import SortableItem from './SortableItem'
import OverlayItem from './OverlayItem'
import { Layout } from './constants'

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
  id: UniqueIdentifier
} & Record<string, unknown>

export interface SortableProps {
  layout: Layout
  spacing?: number // Grid gap
  items?: ItemInterface[]
  renderItem?: ItemProps['renderItem']
  sortKeys?: UniqueIdentifier[]
  setSortKeys?: React.Dispatch<React.SetStateAction<any>>
}

const Sortable = (props: SortableProps) => {
  const {
    layout,
    renderItem,
    items = defaultItems,
    spacing = 2,
    sortKeys: injectedSortKeys,
    setSortKeys: injectedSetSortKeys,
  } = props

  // States
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [localSortkeys, setLocalSortKeys] = useState<UniqueIdentifier[]>(() =>
    items.map(({ id }) => String(id))
  )

  // Allow external state to override the internal state to lift the state up
  const sortKeys = injectedSortKeys || localSortkeys
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
          display: 'grid',
          gap: spacing,
          padding: 0,
          margin: 0,
          '&.horizontal': {
            gridAutoFlow: 'column',
            gridAutoColumns: 'max-content',
          },
          '&.grid': {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          },
        },
      }}
    >
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        sensors={sensors}
        collisionDetection={closestCenter}
        measuring={measuring}
      >
        <SortableContext items={sortKeys}>
          <ul className={clsx('Sortable', layout)}>
            {sortKeys.map((id, index) => (
              <SortableItem
                id={id}
                index={index + 1}
                key={id}
                layout={layout}
                activeIndex={activeIndex}
                renderItem={renderItem}
                item={items.find((item) => String(item.id) === String(id))}
                onRemove={() => handleRemoveItem(id)}
              />
            ))}
          </ul>
        </SortableContext>

        <DragOverlay dropAnimation={dropAnimation}>
          {activeId && (
            <OverlayItem
              id={activeId}
              layout={layout}
              sortKeys={sortKeys}
              renderItem={renderItem}
              item={items.find(({ id }) => String(id) === String(activeId))}
            />
          )}
        </DragOverlay>
      </DndContext>
    </Box>
  )
}

export default Sortable
