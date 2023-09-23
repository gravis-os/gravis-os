import type { UniqueIdentifier } from '@dnd-kit/core'

import React, { HTMLAttributes, forwardRef, useMemo } from 'react'

import { useSortable } from '@dnd-kit/sortable'
import clsx from 'clsx'

import Box from '../Box'
import { SortableLayout, SortablePosition } from './constants'
import { removeIcon } from './icons'
import { ItemInterface } from './Sortable'

const defaultRenderItem = ({ active, dragProps, index, layout, onRemove }) => (
  <>
    <Box
      sx={{
        '&&': {
          backgroundColor: 'lightgrey',
          height: 200,
          width: layout === SortableLayout.Horizontal ? '150px' : '100%',
        },
      }}
      {...dragProps}
    />

    {!active && onRemove && (
      <button className="Remove" onClick={onRemove} type="button">
        {removeIcon}
      </button>
    )}

    {index === undefined ? null : <span className="PageNumber">{index}</span>}
  </>
)

export interface RenderItemProps {
  active?: boolean
  dragProps: any
  id: UniqueIdentifier
  index?: number
  item: ItemInterface
  layout: SortableLayout
  onRemove?(): void
  sortable?: ReturnType<typeof useSortable>
}

export interface ItemProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'id'>,
    Omit<RenderItemProps, 'dragProps'> {
  clone?: boolean
  insertPosition?: SortablePosition
  renderItem?: (props: RenderItemProps) => React.ReactNode
}

const Item = forwardRef<HTMLLIElement, ItemProps>((props, ref) => {
  const {
    id,
    active,
    clone,
    index,
    insertPosition,
    item,
    layout,
    onRemove,
    renderItem = defaultRenderItem,
    sortable,
    style,
    ...rest
  } = props

  const itemJsx = useMemo(() => {
    return renderItem({
      id,
      active,
      dragProps: { ...rest, className: 'Item', 'data-id': id.toString() },
      index,
      item,
      layout,
      onRemove,
      sortable,
    })
  }, [renderItem])

  return (
    <Box
      component="li"
      sx={{
        '@keyframes fadeIn': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        '@keyframes pop': {
          '0%': { transform: 'translate3d(0px, 0px, 0) scale(1)' },
          '100%': { transform: 'translate3d(10px, 10px, 0) scale(1.025)' },
        },
        '& .Item': {
          '&:focus-visible:not(.active &)': {
            boxShadow: '0 0 0 2px #4c9ffe',
          },
          "&[data-id='1']": {
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581714239128-da7bf940cd82?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')",
            backgroundPosition: '-18px 1px',
            backgroundSize: '196px',
          },
          "&[data-id='11']": {
            backgroundImage:
              "url('https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=80')",
          },
          "&[data-id='13']": {
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501769214405-5e5ee5125a02?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=80')",
          },
          "&[data-id='15']": {
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501769214405-5e5ee5125a02?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=80')",
          },
          "&[data-id='17']": {
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506017531682-eccdf2f5acfa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')",
          },
          "&[data-id='19']": {
            backgroundImage:
              "url('https://images.unsplash.com/photo-1532456745301-b2c645d8b80d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=80')",
          },
          "&[data-id='3']": {
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524605546309-2f5cf29dc90f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')",
          },
          "&[data-id='5']": {
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558612123-351952fa7c3d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=80')",
          },
          "&[data-id='7']": {
            backgroundImage:
              "url('https://images.unsplash.com/photo-1520764816423-52375cbff016?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=80')",
          },
          "&[data-id='9']": {
            backgroundImage:
              "url('https://images.unsplash.com/photo-1485627941502-d2e6429a8af0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=80')",
          },
          appearance: 'none',
          backgroundSize: 'cover',
          border: 'none',
          borderRadius: '4px',
          boxShadow:
            '0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(34, 33, 81, 0.15)',
          cursor: 'grab',
          display: 'block',
          outline: 'none',
          position: 'static', // Ensure to set static so that :before and :after indicators will show
          touchAction: 'none',
        },
        '& .PageNumber': {
          animation: 'fadeIn 1000ms ease',
          color: 'rgba(0, 0, 0, 0.5)',
          display: 'inline-block',
          marginTop: '1rem',
          textAlign: 'center',
          userSelect: ['none', 'none'],
          width: '100%',
        },
        '& .Remove': {
          '&:active': { backgroundColor: 'rgba(255, 70, 70, 0.9)' },
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          alignItems: 'center',
          appearance: 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          height: '20px',
          justifyContent: 'center',
          outline: 'none',
          padding: '0',
          position: 'absolute',
          right: '5px',
          svg: { fill: '#fff' },
          top: '5px',
          visibility: 'hidden',
          width: '20px',
        },
        '& .Wrapper': {
          '&:hover': { '.Remove': { visibility: 'visible' } },
          '&:not(.active, .clone)': {
            '&.insertBefore, &.insertAfter': {
              '.Item:after': {
                backgroundColor: '#4c9ffe',
                content: "''",
                position: 'absolute',
              },
            },
          },
          '&:not(.vertical)': {
            '&.insertAfter': {
              '.Item:after': { right: '-9px' },
              '&.clone': { marginLeft: '75px' },
            },
            '&.insertBefore': {
              '.Item:after': { left: '-9px' },
              '&.clone': { marginLeft: '-75px' },
            },
            '&.insertBefore, &.insertAfter': {
              '.Item:after': { bottom: '0', top: '0', width: '2px' },
            },
          },
          '&.active': {
            '.Item': {
              backgroundColor: 'rgba(230, 230, 230)',
              backgroundImage: 'none !important',
            },
            '.PageNumber': { opacity: 0.3 },
          },
          '&.clone': {
            '.Item': {
              animation: 'pop 150ms cubic-bezier(0.18, 0.67, 0.6, 1.22)',
              boxShadow:
                '0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 6px 0 rgba(34, 33, 81, 0.3)',
              cursor: 'grabbing',
              transform: 'translate3d(10px, 10px, 0) scale(1.025)',
            },
          },
          '&.vertical': {
            '&.insertAfter': {
              '.Item:after': { bottom: '-45px' },
              '&.clone': { marginBottom: '125px' },
            },
            '&.insertBefore': {
              '.Item:after': { top: '-15px' },
              '&.clone': { marginTop: '-125px' },
            },
            '&.insertBefore, &.insertAfter': {
              '.Item:after': { height: '2px', left: '0', right: '0' },
            },
          },
          height: '100%',
          position: 'relative',
          width: '100%',
        },
        listStyle: 'none',
      }}
    >
      <div
        className={clsx([
          'Wrapper',
          active && 'active',
          clone && 'clone',
          insertPosition === SortablePosition.Before && 'insertBefore',
          insertPosition === SortablePosition.After && 'insertAfter',
          layout === SortableLayout.Vertical && 'vertical',
        ])}
        ref={ref as any}
        style={style}
      >
        {itemJsx}
      </div>
    </Box>
  )
})

export default Item
