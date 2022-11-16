import React from 'react'
import {
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
  Link,
  Typography,
} from '@mui/material'
import NextLink from 'next/link'

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  items?: Array<{ key: string; title: string; href: string }>
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = (props) => {
  const { items = [], sx, ...rest } = props

  const nextItems = [{ key: 'home', title: 'Home', href: '/' }, ...items]

  return (
    <MuiBreadcrumbs separator="/" sx={{ mb: 1, ...sx }} {...rest}>
      {nextItems.map((item, i) => {
        const { key, title, href } = item
        const isLast = i === nextItems.length - 1

        if (isLast) {
          return (
            <Typography key={key} color="text.secondary" variant="subtitle2">
              {title}
            </Typography>
          )
        }

        return (
          <NextLink key={key} href={href} passHref>
            <Link variant="subtitle2">{title}</Link>
          </NextLink>
        )
      })}
    </MuiBreadcrumbs>
  )
}

export default Breadcrumbs
