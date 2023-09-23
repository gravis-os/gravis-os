import React from 'react'

import Container, { ContainerProps } from './Container'

export interface WithContainerProps {
  container?: boolean | string
  containerProps?: ContainerProps
}

const withContainer = (props: WithContainerProps) => {
  const { container, containerProps: injectedContainerProps } = props

  return (children) => {
    if (!container) return children

    const containerProps = {
      ...(typeof container === 'string' && {
        maxWidth: container as ContainerProps['maxWidth'],
      }),
      ...injectedContainerProps,
    }

    return <Container {...containerProps}>{children}</Container>
  }
}

export default withContainer
