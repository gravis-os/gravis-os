import type { ResponsiveStyleValue } from '@mui/system/styleFunctionSx'

import React from 'react'

import { Box, BoxProps } from '@mui/material'

export interface VideoProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  maxHeight?: ResponsiveStyleValue<React.CSSProperties['maxHeight']>
  sx?: BoxProps['sx']
}

const Video: React.FC<VideoProps> = (props: VideoProps) => {
  const {
    autoPlay = true,
    height,
    loop = true,
    maxHeight,
    muted = true,
    src,
    sx,
    width = '100%',
    ...rest
  } = props

  return (
    <Box
      autoPlay={autoPlay}
      component="video"
      loop={loop}
      muted={muted}
      playsInline
      {...rest}
      sx={{
        height,
        maxHeight,
        objectFit: 'cover',
        width,
        ...sx,
      }}
    >
      <source src={src} type="video/mp4" />
      <source src={src} type="video/webm" />
      <source src={src} type="video/mov" />
      <track kind="captions" />
    </Box>
  )
}

export default Video
