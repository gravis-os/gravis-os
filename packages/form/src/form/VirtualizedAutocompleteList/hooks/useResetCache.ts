import { useRef, useEffect } from 'react'
import { VariableSizeList } from 'react-window'

export const useResetCache = (data: any) => {
  const ref = useRef<VariableSizeList>(null)

  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])

  return ref
}
