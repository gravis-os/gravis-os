import React, { useState, useEffect } from 'react'
import {
  KeenSliderOptions,
  KeenSliderPlugin,
  useKeenSlider,
} from 'keen-slider/react'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import Box, { BoxProps } from '../../core/Box'
import IconButton from '../../core/IconButton'
import ViewAllDialogButton from './ViewAllDialogButton'
import withAutoplayPlugin from './withAutoplayPlugin'
import withScrollPlugin from './withScrollPlugin'
import withThumbnailsPlugin from './withThumbnailsPlugin'
import withAutoHeight from './withAutoHeight'

export interface SliderRenderItemProps {
  prev: () => void
  next: () => void
  reset: () => void
  goTo: (index: number) => void
}

export type SliderRenderItem = ({
  prev,
  next,
}: SliderRenderItemProps) => React.ReactNode

export interface SliderProps extends BoxProps {
  items: Array<React.ReactNode | SliderRenderItem>
  options?: KeenSliderOptions
  plugins?: KeenSliderPlugin[]

  autoHeight?: boolean
  autoplay?: boolean
  scroll?: boolean
  lazy?: boolean
  loop?: boolean
  thumbnails?: boolean
  arrows?: boolean
  viewAll?: boolean
  disableLeftArrow?: boolean
  disableCenter?: boolean
  disableDrag?: boolean
}

/**
 * @note Add `import 'keen-slider/keen-slider.min.css'` in your app
 */
const Slider: React.FC<SliderProps> = (props) => {
  const {
    sx,
    items,
    options: injectedOptions = {},
    plugins: injectedPlugins = [],
    disableDrag,
    disableCenter,
    autoplay,
    lazy,
    loop,
    scroll,
    autoHeight,
    thumbnails,
    arrows,
    disableLeftArrow,
    viewAll,
    ...rest
  } = props

  // Main Ref
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [lazyLoaded, setLazyLoaded] = useState<boolean[]>([])
  const [loaded, setLoaded] = useState(false)
  const [ref, instanceRef] = useKeenSlider<HTMLDivElement>(
    // Options
    {
      loop,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
      ...(lazy && { initial: 0 }),
      ...(disableDrag && { drag: false }),
      ...injectedOptions,
    },
    // Plugins
    [
      ...(autoplay ? [withAutoplayPlugin] : []),
      ...(scroll ? [withScrollPlugin] : []),
      ...(autoHeight ? [withAutoHeight] : []),
      ...injectedPlugins,
    ].filter(Boolean)
  )

  // Lazy loaded
  useEffect(() => {
    const nextLazyLoaded = [...lazyLoaded]
    nextLazyLoaded[currentSlide] = true
    setLazyLoaded(nextLazyLoaded)
  }, [currentSlide])

  // Thumbnails Ref
  const [thumbnailsRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 8,
      },
    },
    [withThumbnailsPlugin(instanceRef)]
  )

  // Item Props
  const commonItemProps = {
    center: !disableCenter,
    className: 'keen-slider__slide',
    sx: {
      '&:hover': { cursor: 'ew-resize' },
      '&:active': { cursor: 'grabbing' },
    },
  }

  // Common Arrow Icon Button props
  const shouldShowArrows = arrows && loaded && instanceRef.current
  const commonArrowIconButtonProps = {
    sx: {
      position: 'absolute',
      zIndex: 1,
      top: '50%',
      transform: 'translate(0, -50%)',
    },
  }

  // Degenerate case
  if (!items?.length) return null

  return (
    <>
      {/* Main */}
      <Box sx={{ position: 'relative' }}>
        {/* Left Arrow */}
        {shouldShowArrows && !disableLeftArrow && (
          <IconButton
            {...commonArrowIconButtonProps}
            sx={{
              ...commonArrowIconButtonProps?.sx,
              left: 0,
            }}
            onClick={(e: any) => {
              e.stopPropagation()
              instanceRef.current?.prev()
            }}
            disabled={!loop && currentSlide === 0}
          >
            <NavigateBeforeOutlinedIcon />
          </IconButton>
        )}
        {/* Right Arrow */}
        {shouldShowArrows && (
          <IconButton
            {...commonArrowIconButtonProps}
            sx={{
              ...commonArrowIconButtonProps?.sx,
              right: 0,
            }}
            onClick={(e: any) => {
              e.stopPropagation()
              instanceRef.current?.next()
            }}
            disabled={
              !loop &&
              currentSlide ===
                instanceRef.current.track.details.slides.length - 1
            }
          >
            <NavigateNextOutlinedIcon />
          </IconButton>
        )}
        {/* View All */}
        {viewAll && <ViewAllDialogButton items={items as React.ReactNode[]} />}

        {/* Main Slider */}
        <Box ref={ref} className="keen-slider" sx={sx} {...rest}>
          {items.map((item, i) => {
            // Render itemJsx
            const itemJsx = (
              <>
                {typeof item === 'function'
                  ? item({
                      prev: instanceRef.current?.prev,
                      next: instanceRef.current?.next,
                      reset: () => instanceRef.current?.moveToIdx?.(0),
                      goTo: (index: number) =>
                        instanceRef.current?.moveToIdx?.(index),
                    })
                  : item}
              </>
            )

            return (
              <Box key={`item-slide-${i}`} {...commonItemProps}>
                {lazy ? lazyLoaded[i] && itemJsx : itemJsx}
              </Box>
            )
          })}
        </Box>
      </Box>

      {/* Thumbnails */}
      {thumbnails && (
        <Box
          ref={thumbnailsRef}
          className="keen-slider thumbnail"
          sx={{
            ...sx,
            mt: 1,
          }}
          {...rest}
        >
          {(items as React.ReactNode[]).map((item, i) => {
            return (
              <Box
                key={`item-slide-thumbnail-${i}`}
                {...commonItemProps}
                sx={{
                  ...commonItemProps?.sx,
                  opacity: 0.8,
                  border: '1px solid transparent',
                  '&:hover': {
                    cursor: 'pointer',
                    borderColor: 'divider',
                    opacity: 1,
                  },
                  '&.active': { borderColor: 'divider', opacity: 1 },
                }}
              >
                {item}
              </Box>
            )
          })}
        </Box>
      )}
    </>
  )
}

export default Slider
