import React from 'react'
import RouterLink from 'next/link'
import { cleanHref } from '@gravis-os/utils'
import Link from './Link'

const withHref =
  ({ href, targetBlank = false }) =>
  (children) => {
    if (!href) return children

    const nextHref = cleanHref(href)

    if (nextHref.startsWith('http') || targetBlank) {
      return (
        <Link href={nextHref} underline="none" target="_blank">
          {children}
        </Link>
      )
    }

    return (
      <RouterLink href={nextHref} passHref>
        {children}
      </RouterLink>
    )
  }

export default withHref
