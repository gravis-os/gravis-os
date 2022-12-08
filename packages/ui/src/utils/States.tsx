import React from 'react'
import renderStatefulChildren from './renderStatefulChildren'

export interface StatesProps {
  isLoading?: boolean
  isError?: boolean
  isEmpty?: boolean
  children?: typeof React.Children
}

const States: React.FC<StatesProps> = (props) => {
  const { isLoading, isError, isEmpty, children } = props
  return renderStatefulChildren(children, { isLoading, isError, isEmpty })
}

export default States
