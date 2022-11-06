import React, { useState } from 'react'
import {
  useKeenSlider,
  KeenSliderOptions,
  KeenSliderPlugin,
} from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined'
import Box, { BoxProps } from '../../core/Box'
import IconButton, { IconButtonProps } from '../../core/IconButton'
import Button, { ButtonProps } from '../../core/Button'
import Dialog, { DialogProps } from '../../core/Dialog'
import withAutoplayPlugin from './withAutoplayPlugin'
import withScrollPlugin from './withScrollPlugin'
import withThumbnailsPlugin from './withThumbnailsPlugin'

export interface SliderProps extends BoxProps {
  items: React.ReactElement[]
  options?: KeenSliderOptions
  plugins?: KeenSliderPlugin[]
  autoplay?: boolean
  scroll?: boolean
  loop?: boolean
  thumbnails?: boolean
  arrows?: boolean
  disableLeftArrow?: boolean
  viewAll?: boolean
}

const Slider: React.FC<SliderProps> = (props) => {
  const {
    sx,
    items,
    options: injectedOptions = {},
    plugins: injectedPlugins = [],
    autoplay,
    loop,
    scroll,
    thumbnails,
    arrows,
    disableLeftArrow,
    viewAll,
    ...rest
  } = props

  // Main Ref
  const [currentSlide, setCurrentSlide] = useState<number>(0)
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
      ...injectedOptions,
    },
    // Plugins
    [
      ...(autoplay ? [withAutoplayPlugin] : []),
      ...(scroll ? [withScrollPlugin] : []),
      ...injectedPlugins,
    ].filter(Boolean)
  )

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
    center: true,
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

  // View all
  const [isViewAllOpen, setIsViewAllOpen] = useState(false)

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
        {viewAll && (
          <>
            <Button
              variant="paper"
              startIcon={<CollectionsOutlinedIcon />}
              onClick={() => setIsViewAllOpen(true)}
              sx={{
                position: 'absolute',
                zIndex: 1,
                right: 0,
                bottom: 0,
                mr: 1,
                mb: 1,
              }}
            >
              View All
            </Button>

            {/* View All Dialog */}
            <Dialog
              open={isViewAllOpen}
              onClose={() => setIsViewAllOpen(false)}
              fullWidth
              maxWidth="lg"
            >
              This is a placeholder
            </Dialog>
          </>
        )}

        {/* Main Slider */}
        <Box ref={ref} className="keen-slider" sx={sx} {...rest}>
          {items.map((item, i) => {
            return (
              <Box key={`item-slide-${i}`} {...commonItemProps}>
                {item}
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
          {items.map((item, i) => {
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
