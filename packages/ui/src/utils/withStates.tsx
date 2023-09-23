import React from 'react'

import States, { StatesProps } from './States'

export interface WithStatesOptions {
  props?: StatesProps
}

const withStates = (options: WithStatesOptions = {}) => {
  return (Component) => {
    return (props) => {
      return (
        <States {...props} {...options?.props}>
          <Component {...props} />
        </States>
      )
    }
  }
}

export default withStates
