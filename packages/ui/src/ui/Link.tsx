import React from 'react'
import RouterLink, { LinkProps as RouterLinkProps } from 'next/link'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'

export interface LinkProps extends MuiLinkProps {
  pointer?: boolean
  rightCaret?: boolean
  displayBlock?: boolean
}

const Link: React.FC<LinkProps> = (props) => {
  const { displayBlock, rightCaret, href, children, pointer, sx, ...rest } =
    props

  const childrenJsx = (
    <MuiLink
      sx={{
        ...(pointer && { cursor: 'pointer' }),
        ...(displayBlock && { display: 'block' }),
        '&:hover': { color: 'primary.main' },
        ...sx,
      }}
      {...rest}
    >
      {children}
      {rightCaret && (
        <KeyboardArrowRightOutlinedIcon
          sx={{
            width: '0.75em',
            height: '0.75em',
            mb: -0.5,
          }}
        />
      )}
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
