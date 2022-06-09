import React from 'react'
import RouterLink, { LinkProps as RouterLinkProps } from 'next/link'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'

export interface LinkProps extends MuiLinkProps {
  pointer?: boolean
}

const Link: React.FC<LinkProps> = (props) => {
  const { href, children, pointer, sx, ...rest } = props

  const childrenJsx = (
    <MuiLink
      sx={{
        ...(pointer && { cursor: 'pointer' }),
        '&:hover': { color: 'primary.main' },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiLink>
  )

  switch (true) {
    case Boolean(href):
      return (
        <RouterLink href={href as RouterLinkProps['href']} passHref>
          {childrenJsx}
        </RouterLink>
      )
    default:
      return childrenJsx
  }
}

export default Link
