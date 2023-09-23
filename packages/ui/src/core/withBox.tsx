import React from 'react'

import dynamic from 'next/dynamic'

import type { BoxProps } from './Box'

const DynamicBox = dynamic(() => import('./Box'))

export interface WithBoxProps extends BoxProps {}

const withBox = (props: WithBoxProps) => (children) => {
  // Escape if no boxProps
  if (!props) return children

  return <DynamicBox {...props}>{children}</DynamicBox>
}

export default withBox
