import React from 'react'
import { UseQueryResult } from 'react-query'

import { Timeline, renderStatefulChildren } from '@gravis-os/ui'

import MemoCard, { MemoCardProps } from './MemoCard'
import { Memo } from './types'

export interface MemoTimelineProps
  extends Omit<MemoCardProps, 'actions' | 'item'> {
  items?: Memo[]
  queryResult: UseQueryResult
  showContact?: boolean
}

const MemoTimeline: React.FC<MemoTimelineProps> = (props) => {
  const { items, queryResult, ...rest } = props

  const { isError, isLoading } = queryResult

  const memosJsx = (
    <Timeline
      items={items?.map((item) => {
        if (!item) return null
        return {
          children: (
            <MemoCard
              {...rest}
              item={{ ...item, title: item?.title ?? 'Note' }}
            />
          ),
          connectorColor: 'primary',
          dotColor: 'primary',
          key: String(item.id),
        }
      })}
    />
  )

  return (
    <div>
      {renderStatefulChildren(memosJsx, {
        isEmpty: items?.length === 0,
        isError,
        isLoading,
      })}
    </div>
  )
}

export default MemoTimeline
