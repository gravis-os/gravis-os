import React from 'react'
import { renderStatefulChildren, Timeline } from '@gravis-os/ui'
import { UseQueryResult } from 'react-query'
import { Memo } from './types'
import MemoCard, { MemoCardProps } from './MemoCard'

export interface MemoTimelineProps
  extends Omit<MemoCardProps, 'item' | 'actions'> {
  items?: Memo[]
  queryResult: UseQueryResult
  showContact?: boolean
}

const MemoTimeline: React.FC<MemoTimelineProps> = (props) => {
  const { items, queryResult, ...rest } = props

  const { isLoading, isError } = queryResult

  const memosJsx = (
    <Timeline
      items={items?.map((item) => {
        if (!item) return null
        return {
          key: String(item.id),
          children: <MemoCard {...rest} item={{ ...item, title: 'Note' }} />,
          dotColor: 'primary',
          connectorColor: 'primary',
        }
      })}
    />
  )

  return (
    <div>
      {renderStatefulChildren(memosJsx, {
        isLoading,
        isError,
        isEmpty: items?.length === 0,
      })}
    </div>
  )
}

export default MemoTimeline
