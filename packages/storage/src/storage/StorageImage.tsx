import React, { useState } from 'react'
import { Box, Image, ImageProps } from '@gravis-os/ui'
import useGetStorageObject from './useGetStorageObject'

interface StorageImageProps extends Omit<ImageProps, 'alt' | 'src'> {
  src?: string | null // defaultValue to render the image. Storage filepath where image is currently stored
  alt?: string | null
  value?: string // Typically, the form value
  disableResponsive?: boolean
  /**
   * The aspect ratio of the image
   * Needs to include a `:` character
   * @example '16:9'
   */
  ar?: string
}

/**
 * A component that renders an image from a storage bucket.
 * @param props
 * @constructor
 *
 * @example <StorageImage src={item.hero_src} alt={item.hero_alt} />
 */
const StorageImage: React.FC<StorageImageProps> = (props) => {
  const {
    ar,
    sx,
    disableResponsive,
    src: filePath,
    value,
    alt,
    ...rest
  } = props

  const [aspectWidth, aspectHeight] = ar?.split(':') || [1, 1]

  const [loading, setLoading] = useState(true)

  const { src } = useGetStorageObject({ filePath, value })

  if (!src)
    return (
      <Box
        sx={{
          ...(!disableResponsive
            ? { position: 'relative', overflow: 'hidden', pb: '100%' }
            : { width: rest?.width, height: rest?.height }),
          backgroundColor: ({ palette: { mode } }) => {
            const isDarkMode = mode === 'dark'
            return isDarkMode ? 'grey.900' : 'grey.100'
          },
        }}
      />
    )

  // Payload
  const childrenJsx = (
    <Image
      src={src}
      alt={alt || (src ? 'Image' : 'No image')}
      onLoadingComplete={() => setLoading(false)}
      {...(!disableResponsive && {
        layout: 'fill',
        objectFit: 'cover',
      })}
      sx={{
        // Adds a blur effect to the image
        // Adapted from https://github.com/leerob/image-gallery-supabase-tailwind-nextjs/blob/main/pages/index.tsx
        filter: loading ? 'blur(40px) grayscale(100%)' : 'blur(0) grayscale(0)',
        transitionDuration: '.7s',
        transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
        transform: loading ? 'scale(1.1)' : 'scale(1)',

        ...sx,
      }}
      {...rest}
    />
  )
  return !disableResponsive ? (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        pb: `calc(${aspectHeight} / ${aspectWidth} * 100%)`,
      }}
    >
      {childrenJsx}
    </Box>
  ) : (
    childrenJsx
  )
}

export default StorageImage
