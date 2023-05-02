import React from 'react'
import { useScrollTrigger, Slide } from '@mui/material'

export interface HideOnScrollProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
  children: React.ReactElement
  threshold?: number
}

const HideOnScroll: React.FC<HideOnScrollProps> = (props) => {
  const { threshold = 100, children } = props

  const trigger = useScrollTrigger({ threshold })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export default HideOnScroll
