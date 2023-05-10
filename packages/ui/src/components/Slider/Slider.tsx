import React, { useState, useEffect } from 'react'
import {
  KeenSliderOptions,
  KeenSliderPlugin,
  useKeenSlider,
} from 'keen-slider/react'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import { ResponsiveStyleValue } from '@mui/system/styleFunctionSx'
import { LinearProgress, LinearProgressProps } from '@mui/material'
import Box, { BoxProps } from '../../core/Box'
import Stack from '../../core/Stack'
import Tabs, { TabsProps } from '../../core/Tabs'
import { TabProps } from '../../core/Tabs/Tab'
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
  itemProps?: BoxProps
  autoHeight?: boolean
  autoplay?: boolean
  scroll?: boolean
  lazy?: boolean
  loop?: boolean
  thumbnails?: boolean
  arrows?: boolean
  dots?: boolean
  dotProps?: { color?: string; sx?: BoxProps['sx'] }
  fade?: boolean
  tabs?: TabProps['label'][]
  tabsProps?: TabsProps
  tabProps?: TabProps
  tabsColor?: 'primary' | 'secondary'
  viewAll?: boolean
  disableLeftArrow?: boolean
  disableCenter?: boolean
  disableDrag?: boolean
  height?: ResponsiveStyleValue<React.CSSProperties['height']>
  speed?: number
  // Autoplay props
  disablePauseOnHover?: boolean
  durationPerSlide?: number
  /**
   * The higher, the smoother the progress bar gets
   */
  progressStepPerSlide?: number
  progress?: boolean
}

/**
 * @note Add `import 'keen-slider/keen-slider.min.css'` in your app
 */
const Slider: React.FC<SliderProps> = (props) => {
  const {
    sx,
    items,
    height,
    itemProps,
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
    dots,
    dotProps,
    fade,
    tabs,
    tabsProps,
    tabProps,
    tabsColor = 'inherit',
    speed,
    middle,
    disableLeftArrow,
    viewAll,
    disablePauseOnHover,
    progress,
    durationPerSlide = 8000,
    progressStepPerSlide = 20,
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
      created() {
        setLoaded(true)
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
              durationPerSlide,
              disablePauseOnHover:
                typeof disablePauseOnHover === 'boolean'
                  ? disablePauseOnHover
                  : Boolean(progress),
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
    middle,
    // Remove the keen-slider__slide selector if we're using fade to prevent transform
    className: fade ? '' : 'keen-slider__slide',
    ...itemProps,
    sx: {
      '&:hover': { cursor: 'ew-resize' },
      '&:active': { cursor: 'grabbing' },
      height,
      // If `fade`, get items to stack on top of each other instead of side by side
      ...(fade && {
        width: '100%',
        height: '100%',
        position: 'absolute' as const,
        top: 0,
      }),
      ...itemProps?.sx,
    },
  }

  // Arrows
  const shouldShowArrows = arrows && loaded && instanceRef.current
  const commonArrowIconButtonProps = {
    sx: {
      position: 'absolute',
      zIndex: 1,
      top: '50%',
      transform: 'translate(0, -50%)',
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
        <Box
          ref={sliderRef}
          className={fade ? '' : 'keen-slider'}
          sx={{
            ...(fade && { position: 'relative', height }),
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
            value={currentSlide}
            onChange={(e, newValue) => instanceRef.current?.moveToIdx(newValue)}
            items={[
              ...new Array(instanceRef.current.track.details.slides.length),
            ].map((_, i) => ({
              key: i,
              value: i,
              label: tabs[i],
              ...tabProps,
            }))}
            centered={!disableCenter}
            disableCard
            indicatorPosition="top"
            TabIndicatorProps={{
              ...(shouldShowProgress && {
                children: (
                  <LinearProgress
                    variant="determinate"
                    value={progressValue}
                    color={tabsColor as LinearProgressProps['color']}
                  />
                ),
              }),
            }}
            hoverColor={tabsColor as TabsProps['hoverColor']}
            textColor={tabsColor as TabsProps['textColor']}
            indicatorColor={tabsColor as TabsProps['indicatorColor']}
            {...tabsProps}
            sx={{
              width: '100%',
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: -8,
              display: 'block',
              textAlign: disableCenter ? 'left' : 'center',
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
              position: 'absolute',
              bottom: 24,
            }}
          >
            {[
              ...new Array(instanceRef.current.track.details.slides.length),
            ].map((_, i) => {
              const { color: dotColor = 'primary.main', sx: dotSx } =
                dotProps || {}
              const isActiveDot = currentSlide === i
              return (
                <Box
                  key={i}
                  component="button"
                  onClick={() => instanceRef.current?.moveToIdx(i)}
                  sx={{
                    width: 16,
                    border: 0,
                    boxShadow: 'none',
                    cursor: 'pointer',
                    backgroundColor: isActiveDot && dotColor,
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
