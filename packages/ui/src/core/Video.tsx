import React from 'react'
import { Box, BoxProps } from '@mui/material'
import { ResponsiveStyleValue } from '@mui/system/styleFunctionSx'

export interface VideoProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  sx?: BoxProps['sx']
  maxHeight?: ResponsiveStyleValue<React.CSSProperties['maxHeight']>
}

const Video: React.FC<VideoProps> = (props: VideoProps) => {
  const {
    src,
    autoPlay = true,
    muted = true,
    loop = true,
    width = '100%',
    height,
    maxHeight,
    sx,
    ...rest
  } = props

  return (
    <Box
      component="video"
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline
      {...rest}
      sx={{
        width,
        height,
        maxHeight,
        objectFit: 'cover',
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
