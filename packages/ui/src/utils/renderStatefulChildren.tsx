import React from 'react'
import Typography, { TypographyProps } from '../core/Typography'

const commonTypographyProps = {
  variant: 'body2',
  color: 'text.secondary',
} as TypographyProps

const renderStatefulChildren = (children, states) => {
  const { isLoading, isError, isEmpty } = states

  switch (true) {
    case Boolean(isLoading):
      return <Typography {...commonTypographyProps}>Loading...</Typography>
    case Boolean(isError):
      return (
        <Typography {...commonTypographyProps}>
          Error: Something went wrong.
        </Typography>
      )
    case Boolean(isEmpty):
      return (
        <Typography {...commonTypographyProps}>No data available.</Typography>
      )
    default:
      return children
  }
}

export default renderStatefulChildren
