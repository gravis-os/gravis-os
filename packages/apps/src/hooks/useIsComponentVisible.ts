import { RefObject, useEffect, useState } from 'react'

export const useIsComponentVisible = (ref: RefObject<HTMLElement>) => {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    )

    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [ref.current])

  return isIntersecting
}
