import React from 'react'

import { Slide, useScrollTrigger } from '@mui/material'

export interface HideOnScrollProps {
  children: React.ReactElement
  threshold?: number
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
}

const HideOnScroll: React.FC<HideOnScrollProps> = (props) => {
  const { children, threshold = 100 } = props

  const trigger = useScrollTrigger({ threshold })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export default HideOnScroll
