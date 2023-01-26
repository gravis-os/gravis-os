import React from 'react'
import { cleanHref } from '@gravis-os/utils'
import Link, { LinkProps } from './Link'

export interface WithHrefProps {
  href?: string
  targetBlank?: boolean
  disabled?: boolean
  linkProps?: LinkProps
}

const withHref = (props: WithHrefProps) => {
  const {
    disabled,
    href,
    targetBlank = false,
    linkProps: injectedLinkProps,
  } = props

  return (children) => {
    if (!href || disabled) return children

    const nextHref = cleanHref(href)
    const isTargetBlank = nextHref.startsWith('http') || targetBlank

    const linkProps = {
      href,
      underline: 'none' as LinkProps['underline'],
      ...(isTargetBlank
        ? { target: '_blank', href: nextHref }
        : { passHref: true }),
      ...injectedLinkProps,
    }

    return <Link {...linkProps}>{children}</Link>
  }
}

export default withHref
