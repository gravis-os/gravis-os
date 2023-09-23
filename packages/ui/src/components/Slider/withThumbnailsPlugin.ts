/* eslint-disable fp/no-loops */

import { KeenSliderInstance, KeenSliderPlugin } from 'keen-slider/react'

const withThumbnailsPlugin =
  (
    mainRef: React.MutableRefObject<KeenSliderInstance | null>
  ): KeenSliderPlugin =>
  (slider) => {
    function removeActive() {
      for (const slide of slider.slides) {
        slide.classList.remove('active')
      }
    }

    function addActive(idx: number) {
      slider.slides[idx].classList.add('active')
    }

    function addClickEvents() {
      for (const [idx, slide] of slider.slides.entries()) {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      }
    }

    slider.on('created', () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on('animationStarted', (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }

export default withThumbnailsPlugin
