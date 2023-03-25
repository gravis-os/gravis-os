import React from 'react'
import get from 'lodash/get'
import RouterLink, { LinkProps as RouterLinkProps } from 'next/link'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import { cleanHref } from '@gravis-os/utils'
import { useGravis } from '@gravis-os/config'

export interface LinkProps extends MuiLinkProps {
  pointer?: boolean
  rightCaret?: boolean
  rightCaretFullWidth?: boolean
  displayBlock?: boolean
  fadeOnHover?: boolean
  /**
   * Set the textColor to text.primary and hoverColor to primary.main by default
   */
  hoverColor?: string
  disableHoverColor?: boolean
  passHref?: boolean
  targetBlank?: boolean
  startIcon?: React.ReactElement
}

const Link: React.FC<LinkProps> = (props) => {
  const {
    startIcon,
    fadeOnHover,
    hoverColor,
    disableHoverColor,
    displayBlock,
    rightCaret,
    rightCaretFullWidth,
    href,
    children,
    pointer,
    sx,
    passHref,
    targetBlank,
    ...rest
  } = props

  // Source config
  const onUseGravis = useGravis()
  const { next } = onUseGravis

  // Define link props
  const linkProps = {
    sx: {
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
              hoverColor ||
              (typeof rest?.color === 'string' &&
                !rest?.color.startsWith('text.') &&
                `${rest.color.split('.')[0]}.dark`) ||
              'secondary.main'

            return get(palette, getKey)
          },
        },
      }),

      // Fade hover effect
      ...(fadeOnHover && { '&:hover': { opacity: 0.87 } }),

      // Right caret full width
      ...(rightCaretFullWidth && {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }),

      // Overrides
      ...sx,
    },
    children: (
      <>
        {startIcon &&
          React.cloneElement(startIcon, {
            sx: {
              fontSize: '1.25rem',
              mr: 0.5,
              position: 'relative',
              top: 4,
            },
          })}
        {children}
        {(rightCaret || rightCaretFullWidth) && (
          <KeyboardArrowRightOutlinedIcon
            sx={{
              width: '0.75em',
              height: '0.75em',
              mb: -0.5,
            }}
          />
        )}
      </>
    ),

    ...(targetBlank && { target: '_blank' }),

    ...rest,
  }

  switch (true) {
    case Boolean(href):
      const nextHref = cleanHref(href)

      // If next >= 13, check next link implementation
      if (next.version >= 13) {
        return (
          <MuiLink
            {...linkProps}
            href={nextHref as MuiLinkProps['href']}
            component={RouterLink}
          />
        )
      }

      // If next < 13, wrap it in a link prop
      return (
        <RouterLink href={nextHref as RouterLinkProps['href']} passHref>
          <MuiLink {...linkProps} />
        </RouterLink>
      )
    default:
      return <MuiLink {...linkProps} />
  }
}

export default Link
