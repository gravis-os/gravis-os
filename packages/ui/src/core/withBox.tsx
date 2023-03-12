import React from 'react'
import Box, { BoxProps } from './Box'

export interface WithBoxProps extends BoxProps {}

const withBox = (props: WithBoxProps) => (children) => {
  // Escape if no boxProps
  if (!props) return children

  return <Box {...props}>{children}</Box>
}

export default withBox
