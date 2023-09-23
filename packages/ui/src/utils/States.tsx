import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import renderStatefulChildren from './renderStatefulChildren'

const ErrorFallback = ({ error }) =>
  renderStatefulChildren(error.message, { isError: true })

export interface StatesProps {
  children?: React.ReactNode
  empty?: boolean

  error?: boolean | unknown
  isEmpty?: boolean

  isError?: boolean | unknown
  isLoading?: boolean

  loading?: boolean
}

const States: React.FC<StatesProps> = (props) => {
  const {
    children,
    empty,
    error,
    isEmpty: injectedIsEmpty,
    isError: injectedIsError,
    isLoading: injectedIsLoading,
    loading,
  } = props

  const isLoading = injectedIsLoading || loading
  const isError = injectedIsError || error
  const isEmpty = injectedIsEmpty || empty

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {renderStatefulChildren(children, {
        isEmpty,
        isError,
        isLoading,
      })}
    </ErrorBoundary>
  )
}

export default States
