import React, { useEffect, useState } from 'react'
import {
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
} from '@mui/material'
import startCase from 'lodash/startCase'
import { useRouter } from 'next/router'
import Link from './Link'
import Typography, { TypographyProps } from './Typography'
import withContainer, { WithContainerProps } from './withContainer'
import Box from './Box'

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  items: Array<{ key: string; title: string; href: string }>
  disableHomeBreadcrumb?: boolean
  typographyProps?: TypographyProps

  // Container
  containerProps?: WithContainerProps['containerProps']
  container?: WithContainerProps['container']

  // Background
  backgroundColor?: React.CSSProperties['backgroundColor']

  autoBreadcrumbs?: boolean

  scrollOnOverflow?: boolean

  hideLastItem?: boolean
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = (props) => {
  const {
    backgroundColor,
    typographyProps,
    disableHomeBreadcrumb,
    scrollOnOverflow,
    items: injectedItems = [],
    sx,
    container,
    containerProps,
    autoBreadcrumbs,
    hideLastItem,
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
            key: subPath,
            title: startCase(subPath),
            href,
          }
        })
        .filter(Boolean)

      setAutoBreadcrumbItems(nextAutoBreadcrumbItems)
    }
  }, [router, autoBreadcrumbs])

  const defaultItems = !disableHomeBreadcrumb
    ? [{ key: 'home', title: 'Home', href: '/' }]
    : []

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
            overflowX: 'scroll',
            whiteSpace: 'nowrap',
            flexWrap: 'nowrap',
            '&::-webkit-scrollbar': { display: 'none' },
          },
        }),

        ...sx,
      }}
      {...rest}
    >
      {nextItems.map((item, i) => {
        const { key, title, href } = item
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
        backgroundColor,
        '& .MuiBreadcrumbs-root': { my: 0, py: 0.5 },
      }}
    >
      {withContainer({ container, containerProps })(childrenJsx)}
    </Box>
  )
}

export default Breadcrumbs
