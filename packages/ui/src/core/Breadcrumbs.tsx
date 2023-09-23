import React, { useEffect, useState } from 'react'

import {
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
} from '@mui/material'
import startCase from 'lodash/startCase'
import { useRouter } from 'next/router'

import Box from './Box'
import Link from './Link'
import Typography, { TypographyProps } from './Typography'
import withContainer, { WithContainerProps } from './withContainer'

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  autoBreadcrumbs?: boolean
  // Background
  backgroundColor?: React.CSSProperties['backgroundColor']
  container?: WithContainerProps['container']

  // Container
  containerProps?: WithContainerProps['containerProps']
  disableHomeBreadcrumb?: boolean

  hideLastItem?: boolean

  items: Array<{ href: string; key: string; title: string }>

  scrollOnOverflow?: boolean

  typographyProps?: TypographyProps
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = (props) => {
  const {
    autoBreadcrumbs,
    backgroundColor,
    container,
    containerProps,
    disableHomeBreadcrumb,
    hideLastItem,
    items: injectedItems = [],
    scrollOnOverflow,
    sx,
    typographyProps,
    ...rest
  } = props

  // Calculate autoBreadcrumbItems
  const router = useRouter()
  const [autoBreadcrumbItems, setAutoBreadcrumbItems] = useState([])
  const hasAutoBreadcrumbItems = autoBreadcrumbs && autoBreadcrumbItems?.length
  useEffect(() => {
    if (router && autoBreadcrumbs) {
      const asPaths = router.asPath.split('/')
      const subPaths = asPaths.slice(1)

      const nextAutoBreadcrumbItems = subPaths
        .map((subPath: string, i) => {
          const isLast = i === subPaths.length - 1
          if (isLast && hideLastItem) return null
          const href = `/${subPaths.slice(0, i + 1).join('/')}`
          return {
            title: startCase(subPath),
            href,
            key: subPath,
          }
        })
        .filter(Boolean)

      setAutoBreadcrumbItems(nextAutoBreadcrumbItems)
    }
  }, [router, autoBreadcrumbs])

  const defaultItems = disableHomeBreadcrumb
    ? []
    : [{ title: 'Home', href: '/', key: 'home' }]

  // Data to render
  const items = [
    ...(hasAutoBreadcrumbItems ? autoBreadcrumbItems : injectedItems),
  ].filter(Boolean)

  // Escape if no items
  if (!items?.length) return null

  // Combined items
  const nextItems = [...defaultItems, ...items]

  const childrenJsx = (
    <MuiBreadcrumbs
      separator="›"
      sx={{
        // Scroll on overflow
        ...(scrollOnOverflow && {
          '& .MuiBreadcrumbs-ol': {
            '&::-webkit-scrollbar': { display: 'none' },
            flexWrap: 'nowrap',
            overflowX: 'scroll',
            whiteSpace: 'nowrap',
          },
        }),

        ...sx,
      }}
      {...rest}
    >
      {nextItems.map((item, i) => {
        const { title, href, key } = item
        const isLast = i === nextItems.length - 1

        const childrenJsx = (
          <Typography variant="overline" {...typographyProps}>
            {title}
          </Typography>
        )

        return (
          <span key={key}>
            {isLast && !hideLastItem ? (
              childrenJsx
            ) : (
              <Link href={href}>{childrenJsx}</Link>
            )}
          </span>
        )
      })}
    </MuiBreadcrumbs>
  )

  return (
    <Box
      sx={{
        '& .MuiBreadcrumbs-root': { my: 0, py: 0.5 },
        backgroundColor,
      }}
    >
      {withContainer({ container, containerProps })(childrenJsx)}
    </Box>
  )
}

export default Breadcrumbs
