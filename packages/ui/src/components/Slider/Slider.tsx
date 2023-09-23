/* eslint-disable fp/no-mutation */

import type { ResponsiveStyleValue } from '@mui/system/styleFunctionSx'

import React, { useEffect, useState } from 'react'

import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import { LinearProgress, LinearProgressProps } from '@mui/material'
import {
  KeenSliderOptions,
  KeenSliderPlugin,
  useKeenSlider,
} from 'keen-slider/react'

import Box, { BoxProps } from '../../core/Box'
import IconButton from '../../core/IconButton'
import Stack from '../../core/Stack'
import Tabs, { TabsProps } from '../../core/Tabs'
import { TabProps } from '../../core/Tabs/Tab'
import ViewAllDialogButton from './ViewAllDialogButton'
import withAutoHeight from './withAutoHeight'
import withAutoplayPlugin from './withAutoplayPlugin'
import withScrollPlugin from './withScrollPlugin'
import withThumbnailsPlugin from './withThumbnailsPlugin'

export interface SliderRenderItemProps {
  goTo: (index: number) => void
  next: () => void
  prev: () => void
  reset: () => void
}

export type SliderRenderItem = ({
  next,
  prev,
}: SliderRenderItemProps) => React.ReactNode

export interface SliderProps extends BoxProps {
  arrows?: boolean
  autoHeight?: boolean
  autoplay?: boolean
  disableCenter?: boolean
  disableDrag?: boolean
  disableLeftArrow?: boolean
  // Autoplay props
  disablePauseOnHover?: boolean
  dotProps?: { color?: string; sx?: BoxProps['sx'] }
  dots?: boolean
  durationPerSlide?: number
  fade?: boolean
  height?: ResponsiveStyleValue<React.CSSProperties['height']>
  itemProps?: BoxProps
  items: Array<React.ReactNode | SliderRenderItem>
  lazy?: boolean
  loop?: boolean
  options?: KeenSliderOptions
  plugins?: KeenSliderPlugin[]
  progress?: boolean
  /**
   * The higher, the smoother the progress bar gets
   */
  progressStepPerSlide?: number
  scroll?: boolean
  speed?: number
  tabProps?: TabProps
  tabs?: TabProps['label'][]
  tabsColor?: 'primary' | 'secondary'
  tabsProps?: TabsProps
  thumbnails?: boolean
  viewAll?: boolean
}

/**
 * @note Add `import 'keen-slider/keen-slider.min.css'` in your app
 */
const Slider: React.FC<SliderProps> = (props) => {
  const {
    arrows,
    autoHeight,
    autoplay,
    disableCenter,
    disableDrag,
    disableLeftArrow,
    disablePauseOnHover,
    dotProps,
    dots,
    durationPerSlide = 8000,
    fade,
    height,
    itemProps,
    items,
    lazy,
    loop,
    middle,
    options: injectedOptions = {},
    plugins: injectedPlugins = [],
    progress,
    progressStepPerSlide = 20,
    scroll,
    speed,
    sx,
    tabProps,
    tabs,
    tabsColor = 'inherit',
    tabsProps,
    thumbnails,
    viewAll,
    ...rest
  } = props

  // Progress
  const [progressValue, setProgressValue] = React.useState(0)
  useEffect(() => {
    if (progress) {
      const timer = setInterval(() => {
        setProgressValue((prevProgress) => {
          if (prevProgress >= 100) return 0
          return prevProgress + 100 / progressStepPerSlide
        })
      }, durationPerSlide / progressStepPerSlide)
      return () => {
        clearInterval(timer)
      }
    }
  }, [])
  const shouldShowProgress = autoplay && progress

  // Main Ref
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [lazyLoaded, setLazyLoaded] = useState<boolean[]>([])
  const [loaded, setLoaded] = useState(false)
  const [opacities, setOpacities] = React.useState<number[]>([])
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    // Options
    {
      loop,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
        if (shouldShowProgress) setProgressValue(0)
      },
      ...(fade && {
        slides: items.length,
      }),
      created() {
        setLoaded(true)
      },
      defaultAnimation: {
        duration: speed || fade ? 2000 : 500,
      },
      detailsChanged(slider) {
        if (fade) {
          const new_opacities = slider.track.details.slides.map(
            (slide) => slide.portion
          )
          setOpacities(new_opacities)
        }
      },
      ...(lazy && { initial: 0 }),
      ...(disableDrag && { drag: false }),
      ...injectedOptions,
    },
    // Plugins
    [
      ...(autoplay
        ? [
            withAutoplayPlugin({
              disablePauseOnHover:
                typeof disablePauseOnHover === 'boolean'
                  ? disablePauseOnHover
                  : Boolean(progress),
              durationPerSlide,
            }),
          ]
        : []),
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
    // Remove the keen-slider__slide selector if we're using fade to prevent transform
    className: fade ? '' : 'keen-slider__slide',
    middle,
    ...itemProps,
    sx: {
      '&:active': { cursor: 'grabbing' },
      '&:hover': { cursor: 'ew-resize' },
      height,
      // If `fade`, get items to stack on top of each other instead of side by side
      ...(fade && {
        height: '100%',
        position: 'absolute' as const,
        top: 0,
        width: '100%',
      }),
      ...itemProps?.sx,
    },
  }

  // Arrows
  const shouldShowArrows = arrows && loaded && instanceRef.current
  const commonArrowIconButtonProps = {
    sx: {
      position: 'absolute',
      top: '50%',
      transform: 'translate(0, -50%)',
      zIndex: 1,
    },
  }
  // Dots
  const shouldShowDots = dots && loaded && instanceRef.current
  // Tabs
  const shouldShowTabs = tabs && loaded && instanceRef.current

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
            aria-label="Slider navigate previous"
            disabled={!loop && currentSlide === 0}
            onClick={(e: any) => {
              e.stopPropagation()
              instanceRef.current?.prev()
            }}
            sx={{
              ...commonArrowIconButtonProps?.sx,
              left: 0,
            }}
          >
            <NavigateBeforeOutlinedIcon />
          </IconButton>
        )}
        {/* Right Arrow */}
        {shouldShowArrows && (
          <IconButton
            {...commonArrowIconButtonProps}
            aria-label="Slider navigate next"
            disabled={
              !loop &&
              currentSlide ===
                instanceRef.current.track.details.slides.length - 1
            }
            onClick={(e: any) => {
              e.stopPropagation()
              instanceRef.current?.next()
            }}
            sx={{
              ...commonArrowIconButtonProps?.sx,
              right: 0,
            }}
          >
            <NavigateNextOutlinedIcon />
          </IconButton>
        )}
        {/* View All */}
        {viewAll && <ViewAllDialogButton items={items as React.ReactNode[]} />}

        {/* Main Slider */}
        <Box
          className={fade ? '' : 'keen-slider'}
          ref={sliderRef}
          sx={{
            ...(fade && { height, position: 'relative' }),
            ...sx,
          }}
          {...rest}
        >
          {items.map((item, i) => {
            // Render itemJsx
            const itemJsx = (
              <>
                {typeof item === 'function'
                  ? item({
                      goTo: (index: number) =>
                        instanceRef.current?.moveToIdx?.(index),
                      next: instanceRef.current?.next,
                      prev: instanceRef.current?.prev,
                      reset: () => instanceRef.current?.moveToIdx?.(0),
                    })
                  : item}
              </>
            )

            return (
              <Box
                key={`item-slide-${i}`}
                {...commonItemProps}
                // Fade effect must be applied via `style` prop instead of sx
                {...(fade && { style: { opacity: opacities[i] } })}
              >
                {lazy ? lazyLoaded[i] && itemJsx : itemJsx}
              </Box>
            )
          })}
        </Box>

        {/* Tabs */}
        {shouldShowTabs && (
          <Tabs
            TabIndicatorProps={{
              ...(shouldShowProgress && {
                children: (
                  <LinearProgress
                    color={tabsColor as LinearProgressProps['color']}
                    value={progressValue}
                    variant="determinate"
                  />
                ),
              }),
            }}
            centered={!disableCenter}
            disableCard
            hoverColor={tabsColor as TabsProps['hoverColor']}
            indicatorColor={tabsColor as TabsProps['indicatorColor']}
            indicatorPosition="top"
            items={Array.from({
              length: instanceRef.current.track.details.slides.length,
            }).map((_, i) => ({
              key: i,
              label: tabs[i],
              value: i,
              ...tabProps,
            }))}
            onChange={(e, newValue) => instanceRef.current?.moveToIdx(newValue)}
            textColor={tabsColor as TabsProps['textColor']}
            value={currentSlide}
            {...tabsProps}
            sx={{
              bottom: -8,
              display: 'block',
              left: 0,
              position: 'absolute',
              right: 0,
              textAlign: disableCenter ? 'left' : 'center',
              width: '100%',
              ...tabsProps?.sx,
            }}
          />
        )}

        {/* Dots */}
        {shouldShowDots && (
          <Stack
            direction="row"
            justifyContent="center"
            spacing={0.5}
            sx={{
              bottom: 24,
              position: 'absolute',
            }}
          >
            {Array.from({
              length: instanceRef.current.track.details.slides.length,
            }).map((_, i) => {
              const { color: dotColor = 'primary.main', sx: dotSx } =
                dotProps || {}
              const isActiveDot = currentSlide === i
              return (
                <Box
                  component="button"
                  key={i}
                  onClick={() => instanceRef.current?.moveToIdx(i)}
                  sx={{
                    backgroundColor: isActiveDot && dotColor,
                    border: 0,
                    boxShadow: 'none',
                    cursor: 'pointer',
                    width: 16,
                    ...dotSx,
                  }}
                />
              )
            })}
          </Stack>
        )}
      </Box>

      {/* Thumbnails */}
      {thumbnails && (
        <Box
          className="keen-slider thumbnail"
          ref={thumbnailsRef}
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
                  '&:hover': {
                    borderColor: 'divider',
                    cursor: 'pointer',
                    opacity: 1,
                  },
                  '&.active': { borderColor: 'divider', opacity: 1 },
                  border: '1px solid transparent',
                  opacity: 0.8,
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
