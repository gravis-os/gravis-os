import { useEffect, useState } from 'react'
import { CrudItem, CrudModule } from '@gravis-os/types'
import setIncrementCount from './setIncrementCount'

export interface UseIncrementCountProps {
  item: CrudItem
  module: CrudModule
  countColumnName?: string
}

const useIncrementCount = (props: UseIncrementCountProps) => {
  const { item, module, countColumnName = 'view_count' } = props

  const [isIncremented, setIsIncremented] = useState(false)

  const incrementCount = async () => {
    if (!item || !module) return

    await setIncrementCount({ item, module, countColumnName })

    setIsIncremented(true)
  }

  useEffect(() => {
    if (item && !isIncremented) incrementCount()
  }, [item, isIncremented])
}

export default useIncrementCount
