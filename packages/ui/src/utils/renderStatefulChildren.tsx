import React from 'react'

import Typography, { TypographyProps } from '../core/Typography'

const commonTypographyProps = {
  color: 'text.secondary',
  variant: 'body2',
} as TypographyProps

const renderStatefulChildren = (children, states) => {
  const { isEmpty, isError, isLoading } = states

  switch (true) {
    case Boolean(isError): {
      return (
        <Typography {...commonTypographyProps}>
          Error: Something went wrong.
        </Typography>
      )
    }
    case Boolean(isLoading): {
      return <Typography {...commonTypographyProps}>Loading...</Typography>
    }
    case Boolean(!children):
    case Boolean(isEmpty): {
      return (
        <Typography {...commonTypographyProps}>No data available.</Typography>
      )
    }
    default: {
      return children
    }
  }
}

export default renderStatefulChildren
