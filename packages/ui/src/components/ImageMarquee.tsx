import React from 'react'
import Image, { ImageProps } from 'next/image'
import ReactFastMarquee from 'react-fast-marquee'
import { Box, BoxProps, Stack } from '@mui/material'

const getWidth = (size: ImageMarqueeProps['size']) => {
  switch (size) {
    case 'lg':
      return 640
    case 'sm':
      return 360
    default:
      return 480
  }
}

const getGutterMultiplier = (size: ImageMarqueeProps['size']) => {
  switch (size) {
    case 'lg':
      return 2
    case 'sm':
      return 1
    default:
      return 1
  }
}

export interface ImageMarqueeProps extends BoxProps {
  items: ImageProps[]
  ImageProps?: ImageProps
  size?: 'sm' | 'md' | 'lg' | string
  aspectRatio?: number
}

const ImageMarquee: React.FC<ImageMarqueeProps> = (props) => {
  const {
    items,
    ImageProps,
    size = 'md',
    aspectRatio = 1.75229358,
    ...rest
  } = props

  const width = getWidth(size)
  const gutterMultiplier = getGutterMultiplier(size)

  const defaultImageProps = {
    width,
    height: width / aspectRatio,
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const imageProps: ImageProps = {
    ...defaultImageProps,
    ...ImageProps,
  }

  return (
    <Box {...rest}>
      <ReactFastMarquee
        style={{ paddingRight: 8 * gutterMultiplier }}
        gradient={false}
        speed={30}
      >
        <Stack
          direction="row"
          spacing={2 * gutterMultiplier}
          mr={2 * gutterMultiplier}
        >
          {items.map((item) => {
            const { src, alt } = item
            return (
              <div key={alt}>
                <Image src={src} alt={alt} {...(imageProps as any)} />
              </div>
            )
          })}
        </Stack>
      </ReactFastMarquee>
    </Box>
  )
}

export default ImageMarquee
