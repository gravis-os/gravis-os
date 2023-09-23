import type { RevealProps as ReactAwesomeRevealProps } from 'react-awesome-reveal'

import React from 'react'

import { keyframes } from '@emotion/react'
import dynamic from 'next/dynamic'

const DynamicFade = dynamic(() =>
  import('react-awesome-reveal').then((module) => module.Fade)
)
const DynamicSlide = dynamic(() =>
  import('react-awesome-reveal').then((module) => module.Slide)
)
const DynamicReactAwesomeReveal = dynamic(() =>
  import('react-awesome-reveal').then((module) => module.Reveal)
)

// Override the default animation to reduce the distance of the fade
// @link https://github.com/morellodev/react-awesome-reveal/issues/43
const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 48px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

export enum RevealVariantEnum {
  Fade = 'fade',
  Slide = 'slide',
}

export interface RevealProps extends ReactAwesomeRevealProps {
  variant?: RevealVariantEnum
}

const Reveal: React.FC<RevealProps> = (props) => {
  const { variant, ...rest } = props

  const commonProps = { triggerOnce: true, ...rest }

  // Render
  switch (variant) {
    case RevealVariantEnum.Fade: {
      return <DynamicFade {...commonProps} />
    }
    case RevealVariantEnum.Slide: {
      return <DynamicSlide {...commonProps} />
    }
    default: {
      return (
        <DynamicReactAwesomeReveal
          duration={1000}
          keyframes={customAnimation}
          {...commonProps}
        />
      )
    }
  }
}

export default Reveal
