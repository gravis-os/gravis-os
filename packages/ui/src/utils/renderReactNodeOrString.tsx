import React, { ReactNode, isValidElement } from 'react'

import { Typography, TypographyProps } from '..'

const renderReactNodeOrString = (
  node: ReactNode,
  typographyProps?: TypographyProps
) => {
  return isValidElement(node) ? (
    node
  ) : (
    <Typography {...typographyProps}>{node}</Typography>
  )
}

export default renderReactNodeOrString
