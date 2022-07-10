import React from 'react'
import RouterLink from 'next/link'

const withHref =
  ({ href }) =>
  (children) => {
    if (!href) return children

    return (
      <RouterLink href={href} passHref>
        {children}
      </RouterLink>
    )
  }

export default withHref
