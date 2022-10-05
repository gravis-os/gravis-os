import React from 'react'
import get from 'lodash/get'
import RouterLink, { LinkProps as RouterLinkProps } from 'next/link'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'

export interface LinkProps extends MuiLinkProps {
  pointer?: boolean
  rightCaret?: boolean
  displayBlock?: boolean
  fadeOnHover?: boolean
  /**
   * Set the textColor to text.primary and hoverColor to primary.main by default
   */
  hoverColor?: string
  disableHoverColor?: boolean
}

const Link: React.FC<LinkProps> = (props) => {
  const {
    fadeOnHover,
    hoverColor,
    disableHoverColor,
    displayBlock,
    rightCaret,
    href,
    children,
    pointer,
    sx,
    ...rest
  } = props

  const childrenJsx = (
    <MuiLink
      sx={{
        ...(pointer && { cursor: 'pointer' }),
        ...(displayBlock && { display: 'block' }),

        // Hover effects
        transition: ({ transitions }) =>
          transitions.create(['opacity', 'color'], {
            duration: transitions.duration.shorter,
          }),

        // Color hover effect
        ...(!disableHoverColor && {
          '&:hover': {
            color: ({ palette }) => {
              const getKey =
                typeof rest?.color === 'string'
                  ? `${rest.color.split('.')[0]}.dark`
                  : hoverColor || 'secondary.main'

              return get(palette, getKey)
            },
          },
        }),

        // Fade hover effect
        ...(fadeOnHover && { '&:hover': { opacity: 0.87 } }),

        // Overrides
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
