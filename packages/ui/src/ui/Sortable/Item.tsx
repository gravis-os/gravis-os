import React, { forwardRef, HTMLAttributes, useMemo } from 'react'
import type { UniqueIdentifier } from '@dnd-kit/core'
import clsx from 'clsx'
import { useSortable } from '@dnd-kit/sortable'
import { removeIcon } from './icons'
import Box from '../Box'
import { ItemInterface } from './Sortable'
import { SortableLayout, SortablePosition } from './constants'

const defaultRenderItem = ({ dragProps, index, active, onRemove, layout }) => (
  <>
    <Box
      sx={{
        '&&': {
          width: layout === SortableLayout.Horizontal ? '150px' : '100%',
          height: 200,
          backgroundColor: 'lightgrey',
        },
      }}
      {...dragProps}
    />

    {!active && onRemove && (
      <button type="button" className="Remove" onClick={onRemove}>
        {removeIcon}
      </button>
    )}

    {index != null ? <span className="PageNumber">{index}</span> : null}
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
    index,
    active,
    clone,
    insertPosition,
    layout,
    onRemove,
    style,
    sortable,
    renderItem = defaultRenderItem,
    item,
    ...rest
  } = props

  const itemJsx = useMemo(() => {
    return renderItem({
      active,
      onRemove,
      index,
      id,
      dragProps: { ...rest, className: 'Item', 'data-id': id.toString() },
      sortable,
      item,
      layout,
    })
  }, [renderItem])

  return (
    <Box
      component="li"
      sx={{
        listStyle: 'none',
        '& .Wrapper': {
          width: '100%',
          height: '100%',
          position: 'relative',
          '&.active': {
            '.Item': {
              backgroundImage: 'none !important',
              backgroundColor: 'rgba(230, 230, 230)',
            },
            '.PageNumber': { opacity: 0.3 },
          },
          '&.clone': {
            '.Item': {
              transform: 'translate3d(10px, 10px, 0) scale(1.025)',
              animation: 'pop 150ms cubic-bezier(0.18, 0.67, 0.6, 1.22)',
              boxShadow:
                '0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 6px 0 rgba(34, 33, 81, 0.3)',
              cursor: 'grabbing',
            },
          },
          '&:hover': { '.Remove': { visibility: 'visible' } },
          '&:not(.active, .clone)': {
            '&.insertBefore, &.insertAfter': {
              '.Item:after': {
                content: "''",
                position: 'absolute',
                backgroundColor: '#4c9ffe',
              },
            },
          },
          '&:not(.vertical)': {
            '&.insertBefore, &.insertAfter': {
              '.Item:after': { top: '0', bottom: '0', width: '2px' },
            },
            '&.insertBefore': {
              '&.clone': { marginLeft: '-75px' },
              '.Item:after': { left: '-9px' },
            },
            '&.insertAfter': {
              '&.clone': { marginLeft: '75px' },
              '.Item:after': { right: '-9px' },
            },
          },
          '&.vertical': {
            '&.insertBefore, &.insertAfter': {
              '.Item:after': { left: '0', right: '0', height: '2px' },
            },
            '&.insertBefore': {
              '&.clone': { marginTop: '-125px' },
              '.Item:after': { top: '-15px' },
            },
            '&.insertAfter': {
              '&.clone': { marginBottom: '125px' },
              '.Item:after': { bottom: '-45px' },
            },
          },
        },
        '& .Item': {
          position: 'static', // Ensure to set static so that :before and :after indicators will show
          display: 'block',
          backgroundSize: 'cover',
          borderRadius: '4px',
          boxShadow:
            '0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(34, 33, 81, 0.15)',
          outline: 'none',
          appearance: 'none',
          border: 'none',
          touchAction: 'none',
          cursor: 'grab',
          '&:focus-visible:not(.active &)': {
            boxShadow: '0 0 0 2px #4c9ffe',
          },
          "&[data-id='1']": {
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581714239128-da7bf940cd82?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')",
            backgroundSize: '196px',
            backgroundPosition: '-18px 1px',
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
        },
        '& .Remove': {
          display: 'flex',
          visibility: 'hidden',
          position: 'absolute',
          top: '5px',
          right: '5px',
          width: '20px',
          height: '20px',
          padding: '0',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '50%',
          appearance: 'none',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          '&:active': { backgroundColor: 'rgba(255, 70, 70, 0.9)' },
          svg: { fill: '#fff' },
        },
        '& .PageNumber': {
          display: 'inline-block',
          width: '100%',
          marginTop: '1rem',
          textAlign: 'center',
          color: 'rgba(0, 0, 0, 0.5)',
          userSelect: ['none', 'none'],
          animation: 'fadeIn 1000ms ease',
        },
        '@keyframes fadeIn': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        '@keyframes pop': {
          '0%': { transform: 'translate3d(0px, 0px, 0) scale(1)' },
          '100%': { transform: 'translate3d(10px, 10px, 0) scale(1.025)' },
        },
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
        style={style}
        ref={ref as any}
      >
        {itemJsx}
      </div>
    </Box>
  )
})

export default Item
