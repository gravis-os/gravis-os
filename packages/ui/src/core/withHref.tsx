import React from 'react'
import dynamic from 'next/dynamic'
import { cleanHref } from '@gravis-os/utils'
import type { LinkProps } from './Link'

const DynamicLink = dynamic(() => import('./Link'))

export interface WithHrefProps {
  href?: string
  targetBlank?: boolean
  disabled?: boolean
  linkProps?: LinkProps
  sx?: LinkProps['sx']
}

const withHref = (props: WithHrefProps) => {
  const {
    disabled,
    href,
    targetBlank = false,
    sx,
    linkProps: injectedLinkProps,
  } = props

  return (children) => {
    if (!href || disabled) return children

    const nextHref = cleanHref(href)
    const isTargetBlank = nextHref.startsWith('http') || targetBlank

    const linkProps = {
      href,
      underline: 'none' as LinkProps['underline'],
      sx,
      ...(isTargetBlank
        ? { target: '_blank', href: nextHref }
        : { passHref: true }),
      ...injectedLinkProps,
    }

    return <DynamicLink {...linkProps}>{children}</DynamicLink>
  }
}

export default withHref
