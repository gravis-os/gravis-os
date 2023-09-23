import { useEffect, useState } from 'react'

import { CrudItem, CrudModule } from '@gravis-os/types'

import fetchIncrementCountRpc from './fetchIncrementCountRpc'

export interface UseIncrementCountProps {
  countColumnName?: string
  item: CrudItem
  module: CrudModule
}

const useIncrementCount = (props: UseIncrementCountProps) => {
  const { countColumnName = 'view_count', item, module } = props

  const [isIncremented, setIsIncremented] = useState(false)

  const incrementCount = async () => {
    if (!item || !module) return

    await fetchIncrementCountRpc({ countColumnName, item, module })

    setIsIncremented(true)
  }

  useEffect(() => {
    if (item && !isIncremented) incrementCount()
  }, [item, isIncremented])
}

export default useIncrementCount
