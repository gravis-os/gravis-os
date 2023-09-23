import React from 'react'

import AuthProvider from './AuthProvider'

const withAuthProvider =
  (props = {}) =>
  (Component) =>
  () => {
    return (
      <AuthProvider {...props}>
        <Component />
      </AuthProvider>
    )
  }

export default withAuthProvider
