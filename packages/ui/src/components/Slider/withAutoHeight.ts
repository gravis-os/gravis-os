/* eslint-disable fp/no-mutation */

import { KeenSliderPlugin } from 'keen-slider/react'

/**
 * @note that this is different from adaptiveHeight because the latter
 * requires height to be manually set on the slider item while the former
 * does not require height.
 * https://keen-slider.io/examples#adaptive-height
 *
 * @param slider
 */
const withAutoHeight: KeenSliderPlugin = (slider) => {
  const updateHeight = () => {
    const currentSlideIndex = slider.track.details.rel
    const currentSlide = slider.slides[currentSlideIndex]
    const nextHeight = (currentSlide.firstChild as any)?.offsetHeight

    // eslint-disable-next-line no-param-reassign
    slider.container.style.height = `${nextHeight}px`
  }

  slider.on('created', () => {
    // Hack: Set time out to ensure accurate height is captured on the first load
    setTimeout(() => {
      updateHeight()
    }, 100)
  })
  slider.on('slideChanged', updateHeight)
}

export default withAutoHeight
