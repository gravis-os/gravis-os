'use client'

import React from 'react'

import { useGravis } from '@gravis-os/config'
import { cleanHref } from '@gravis-os/utils'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'
import get from 'lodash/get'
import RouterLink, { LinkProps as RouterLinkProps } from 'next/link'

export interface LinkProps extends MuiLinkProps {
  disableHoverColor?: boolean
  displayBlock?: boolean
  fadeOnHover?: boolean
  /**
   * Set the textColor to text.primary and hoverColor to primary.main by default
   */
  hoverColor?: string
  passHref?: boolean
  pointer?: boolean
  rightCaret?: boolean
  rightCaretFullWidth?: boolean
  startIcon?: React.ReactElement
  targetBlank?: boolean
}

const Link: React.FC<LinkProps> = (props) => {
  const {
    children,
    disableHoverColor,
    displayBlock,
    fadeOnHover,
    hoverColor,
    href,
    passHref,
    pointer,
    rightCaret,
    rightCaretFullWidth,
    startIcon,
    sx,
    targetBlank,
    ...rest
  } = props

  // Source config
  const onUseGravis = useGravis()
  const { next } = onUseGravis

  // Define link props
  const linkProps = {
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
              height: '0.75em',
              mb: -0.5,
              width: '0.75em',
            }}
          />
        )}
      </>
    ),
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
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
      }),

      // Overrides
      ...sx,
    },

    ...(targetBlank && { target: '_blank' }),

    ...rest,
  }

  switch (true) {
    case Boolean(href): {
      const nextHref = cleanHref(href)

      // If next >= 13, check next link implementation
      if (next.version >= 13) {
        return (
          <MuiLink
            {...linkProps}
            component={RouterLink}
            href={nextHref as MuiLinkProps['href']}
          />
        )
      }

      // If next < 13, wrap it in a link prop
      return (
        <RouterLink href={nextHref as RouterLinkProps['href']} passHref>
          <MuiLink {...linkProps} />
        </RouterLink>
      )
    }
    default: {
      return <MuiLink {...linkProps} />
    }
  }
}

export default Link
