import React from 'react'

import { cleanHref } from '@gravis-os/utils'
import dynamic from 'next/dynamic'

import type { LinkProps } from './Link'

const DynamicLink = dynamic(() => import('./Link'))

export interface WithHrefProps {
  disabled?: boolean
  href?: string
  linkProps?: LinkProps
  sx?: LinkProps['sx']
  targetBlank?: boolean
}

const withHref = (props: WithHrefProps) => {
  const {
    disabled,
    href,
    linkProps: injectedLinkProps,
    sx,
    targetBlank = false,
  } = props

  return (children) => {
    if (!href || disabled) return children

    const nextHref = cleanHref(href)
    const isTargetBlank = nextHref.startsWith('http') || targetBlank

    const linkProps = {
      href,
      sx,
      underline: 'none' as LinkProps['underline'],
      ...(isTargetBlank
        ? { href: nextHref, target: '_blank' }
        : { passHref: true }),
      ...injectedLinkProps,
    }

    return <DynamicLink {...linkProps}>{children}</DynamicLink>
  }
}

export default withHref
