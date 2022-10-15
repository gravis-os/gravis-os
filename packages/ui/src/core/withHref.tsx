import React from 'react'
import RouterLink from 'next/link'
import { cleanHref } from '@gravis-os/utils'

const withHref =
  ({ href }) =>
  (children) => {
    if (!href) return children

    const nextHref = cleanHref(href)

    return (
      <RouterLink href={nextHref} passHref>
        {children}
      </RouterLink>
    )
  }

export default withHref
