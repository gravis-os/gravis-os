import React from 'react'
import useErrorBoundary from 'use-error-boundary'
import renderStatefulChildren from './renderStatefulChildren'

export interface StatesProps {
  isLoading?: boolean
  loading?: boolean

  isError?: boolean
  error?: boolean

  isEmpty?: boolean
  empty?: boolean

  children?: React.ReactNode
}

const States: React.FC<StatesProps> = (props) => {
  const {
    isLoading: injectedIsLoading,
    loading,
    isError: injectedIsError,
    error,
    isEmpty: injectedIsEmpty,
    empty,
    children,
  } = props

  const isLoading = injectedIsLoading || loading
  const isError = injectedIsError || error
  const isEmpty = injectedIsEmpty || empty

  const {
    ErrorBoundary,
    didCatch,
    error: errorBoundaryError,
  } = useErrorBoundary()

  if (didCatch) return renderStatefulChildren(children, { isError: didCatch })

  return (
    <ErrorBoundary>
      {renderStatefulChildren(children, {
        isLoading,
        isError,
        isEmpty,
      })}
    </ErrorBoundary>
  )
}

export default States
