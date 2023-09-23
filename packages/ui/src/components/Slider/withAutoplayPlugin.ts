/* eslint-disable fp/no-let, fp/no-mutation */

import { KeenSliderPlugin } from 'keen-slider/react'

const withAutoplay =
  (options: {
    disablePauseOnHover?: boolean
    durationPerSlide: number
  }): KeenSliderPlugin =>
  (slider) => {
    const { disablePauseOnHover, durationPerSlide } = options

    let timeout
    let mouseOver = false

    function clearNextTimeout() {
      clearTimeout(timeout)
    }
    function nextTimeout() {
      clearTimeout(timeout)
      if (mouseOver && !disablePauseOnHover) return
      timeout = setTimeout(() => {
        slider.next()
      }, durationPerSlide)
    }

    slider.on('created', () => {
      if (!disablePauseOnHover) {
        slider.container.addEventListener('mouseover', () => {
          mouseOver = true
          clearNextTimeout()
        })
        slider.container.addEventListener('mouseout', () => {
          mouseOver = false
          nextTimeout()
        })
      }

      nextTimeout()
    })

    slider.on('dragStarted', clearNextTimeout)
    slider.on('animationEnded', nextTimeout)
    slider.on('updated', nextTimeout)
  }

export default withAutoplay
