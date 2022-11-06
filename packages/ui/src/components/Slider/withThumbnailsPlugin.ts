import { KeenSliderPlugin, KeenSliderInstance } from 'keen-slider/react'

const withThumbnailsPlugin =
  (
    mainRef: React.MutableRefObject<KeenSliderInstance | null>
  ): KeenSliderPlugin =>
  (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('active')
      })
    }

    function addActive(idx: number) {
      slider.slides[idx].classList.add('active')
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
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
