import React, { useState } from 'react'
import {
  closestCenter,
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  useDndContext,
  MeasuringStrategy,
  DropAnimation,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import type {
  DragStartEvent,
  DragEndEvent,
  MeasuringConfiguration,
  UniqueIdentifier,
} from '@dnd-kit/core'
import {
  arrayMove,
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import clsx from 'clsx'
import { CSS, isKeyboardEvent } from '@dnd-kit/utilities'
import { createRange } from './createRange'
import { Page, Layout, Position } from './Page'
import type { PageProps } from './Page'
import Box from '../Box'

export type ItemInterface = {
  id: UniqueIdentifier
} & Record<string, unknown>

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

function PageOverlay(
  props: Omit<PageProps, 'index'> & {
    sortKeys: UniqueIdentifier[]
    item: ItemInterface
  }
) {
  const { id, sortKeys, ...rest } = props
  const { activatorEvent, over } = useDndContext()
  const isKeyboardSorting = isKeyboardEvent(activatorEvent)
  const activeIndex = sortKeys.indexOf(id)
  const overIndex = over?.id ? sortKeys.indexOf(over?.id) : -1

  return (
    <Page
      id={id}
      {...rest}
      clone
      insertPosition={
        isKeyboardSorting && overIndex !== activeIndex
          ? overIndex > activeIndex
            ? Position.After
            : Position.Before
          : undefined
      }
    />
  )
}

function SortablePage(
  props: PageProps & { activeIndex: number; item: ItemInterface }
) {
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

  return (
    <Page
      id={id}
      ref={setNodeRef}
      sortable={sortable} // Pass through sortable context
      active={isDragging}
      style={{
        transition,
        transform: isSorting ? undefined : CSS.Translate.toString(transform),
      }}
      insertPosition={
        over?.id === id
          ? index > activeIndex
            ? Position.After
            : Position.Before
          : undefined
      }
      {...rest}
      {...attributes}
      {...listeners}
    />
  )
}

export interface PagesProps {
  layout: Layout
  items?: ItemInterface[]
  renderItem?: PageProps['renderItem']
}

const defaultItems: any = createRange(20, (index) => ({
  id: `${index + 1}`,
  title: `${index + 1}`,
}))

// TODO@Joel: Rename to Sortable. Rename Page to SortableItem
export function Pages(props: PagesProps) {
  const { layout, renderItem, items = defaultItems } = props

  // States
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [sortKeys, setSortKeys] = useState<UniqueIdentifier[]>(() =>
    items.map(({ id }) => String(id))
  )

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
        '& .Pages': {
          display: 'grid',
          gap: 2,
          padding: 2,
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
          <ul className={clsx('Pages', layout)}>
            {sortKeys.map((id, index) => (
              <SortablePage
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
            <PageOverlay
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
