'use client'

import { useEffect } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

export interface NavigationEventsProps {
  onUrlChange: (url: string) => void
}

const NavigationEvents: React.FC<NavigationEventsProps> = (props) => {
  const { onUrlChange } = props
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    onUrlChange(url)
  }, [pathname, searchParams])

  return null
}

export default NavigationEvents
