import React from 'react'
import {
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
  Typography,
} from '@mui/material'
import Link from './Link'

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  items: Array<{ key: string; title: string; href: string }>
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = (props) => {
  const { items = [], sx, ...rest } = props

  if (!items?.length) return null

  const nextItems = [{ key: 'home', title: 'Home', href: '/' }, ...items]

  return (
    <MuiBreadcrumbs separator="/" sx={{ ...sx }} {...rest}>
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
          <Link key={key} href={href} variant="subtitle2">
            {title}
          </Link>
        )
      })}
    </MuiBreadcrumbs>
  )
}

export default Breadcrumbs
