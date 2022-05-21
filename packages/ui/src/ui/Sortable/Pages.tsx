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
import type { Props as PageProps } from './Page'
import Box from '../Box'

interface Props {
  layout: Layout
}

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

export function Pages({ layout }: Props) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [items, setItems] = useState(() =>
    createRange<UniqueIdentifier>(20, (index) => `${index + 1}`)
  )
  const activeIndex = activeId ? items.indexOf(activeId) : -1
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  return (
    <Box
      sx={{
        '& .Pages': {
          display: 'grid',
          gap: '1rem',
          padding: '1rem',
          margin: '0',
          '&.horizontal': {
            gridAutoFlow: 'column',
            gridAutoColumns: 'max-content',
          },
          '&.grid': {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 150px)',
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
        <SortableContext items={items}>
          <ul className={clsx('Pages', layout)}>
            {items.map((id, index) => (
              <SortablePage
                id={id}
                index={index + 1}
                key={id}
                layout={layout}
                activeIndex={activeIndex}
                onRemove={() =>
                  setItems((items) => items.filter((itemId) => itemId !== id))
                }
              />
            ))}
          </ul>
        </SortableContext>
        <DragOverlay dropAnimation={dropAnimation}>
          {activeId ? (
            <PageOverlay id={activeId} layout={layout} items={items} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Box>
  )

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id)
  }

  function handleDragCancel() {
    setActiveId(null)
  }

  function handleDragEnd({ over }: DragEndEvent) {
    if (over) {
      const overIndex = items.indexOf(over.id)

      if (activeIndex !== overIndex) {
        const newIndex = overIndex

        setItems((items) => arrayMove(items, activeIndex, newIndex))
      }
    }

    setActiveId(null)
  }
}

function PageOverlay({
  id,
  items,
  ...props
}: Omit<PageProps, 'index'> & { items: UniqueIdentifier[] }) {
  const { activatorEvent, over } = useDndContext()
  const isKeyboardSorting = isKeyboardEvent(activatorEvent)
  const activeIndex = items.indexOf(id)
  const overIndex = over?.id ? items.indexOf(over?.id) : -1

  return (
    <Page
      id={id}
      {...props}
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

function SortablePage({
  id,
  activeIndex,
  ...props
}: PageProps & { activeIndex: number }) {
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
  } = useSortable({
    id,
    animateLayoutChanges: always,
  })

  return (
    <Page
      ref={setNodeRef}
      id={id}
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
      {...props}
      {...attributes}
      {...listeners}
    />
  )
}

function always() {
  return true
}
