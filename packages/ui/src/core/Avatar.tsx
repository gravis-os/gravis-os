import React from 'react'
import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
} from '@mui/material'
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined'
import { getCssStringSplit } from '@gravis-os/utils'
import getColorFromString from '../utils/getColorFromString'

const getLetterAvatarFallbackProps = (name: string) => {
  if (!name) return
  return {
    children: (name.includes(' ')
      ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
      : name.slice(0, 1)
    ).toUpperCase(),
  }
}

// Force fallback image as MUI default fallback only occurs when src onError
// and doesn't occur when src is falsey.
const getIconAvatarFallbackProps = (props) => {
  const { size, sizeSx } = props

  const fallbackIconSizeSx =
    size &&
    Object.entries(sizeSx).reduce((acc, [key, value]) => {
      if (typeof value !== 'number') return acc
      return { ...acc, [key]: value * 0.6 }
    }, {})

  return {
    children: (
      <PhotoSizeSelectActualOutlinedIcon sx={{ ...fallbackIconSizeSx }} />
    ),
  }
}

export interface AvatarProps extends MuiAvatarProps {
  size?: number
  /**
   * Fallback to Avatar with truncated letters from `alt` prop
   */
  letterAltFallback?: boolean
  border?: boolean
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const {
    size,
    sx,
    letterAltFallback: injectedLetterAltFallback,
    border,
    ...rest
  } = props
  const { src, alt, children } = rest

  const letterAltFallback = injectedLetterAltFallback ?? Boolean(alt)

  // Size
  const sizeSx = size && { width: size, height: size }

  // Fallbacks
  const fallbackProps = letterAltFallback
    ? getLetterAvatarFallbackProps(alt)
    : getIconAvatarFallbackProps({ size, sizeSx })

  const fallbackSx = letterAltFallback
    ? {
        bgcolor: getColorFromString(alt),
        fontSize: (theme) => {
          const [number, unit] = getCssStringSplit(
            theme.typography.subtitle2.fontSize
          )
          return `${number * (size / 40)}${unit}`
        },
      }
    : {
        backgroundColor: 'transparent',
        borderWidth: '1px',
        color: 'primary.main',
        borderStyle: src ? 'solid' : 'dashed',
        borderColor: src ? 'transparent' : 'primary.main',
      }

  const shouldFallback = !src && !children

  // Common props
  const avatarProps = {
    ...rest,
    sx: {
      ...sizeSx,

      // Border
      ...(border && { border: '1px solid', borderColor: 'divider' }),

      ...sx,
      // Fallback styles
      ...(shouldFallback && fallbackSx),
    },
    // Calculate fallback
    ...(shouldFallback && fallbackProps),
  }

  // Default render
  return <MuiAvatar {...avatarProps} />
}

export default Avatar
