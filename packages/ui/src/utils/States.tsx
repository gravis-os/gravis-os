import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import renderStatefulChildren from './renderStatefulChildren'

const ErrorFallback = ({ error, resetErrorBoundary, children }) =>
  renderStatefulChildren(children || error.message, { isError: true })

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

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {renderStatefulChildren(children, {
        isLoading,
        isError,
        isEmpty,
      })}
    </ErrorBoundary>
  )
}

export default States
