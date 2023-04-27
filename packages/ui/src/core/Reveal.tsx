import React from 'react'
import {
  Fade,
  Slide,
  Reveal as ReactAwesomeReveal,
  RevealProps as ReactAwesomeRevealProps,
} from 'react-awesome-reveal'
import { keyframes } from '@emotion/react'

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
    case RevealVariantEnum.Fade:
      return <Fade {...commonProps} />
    case RevealVariantEnum.Slide:
      return <Slide {...commonProps} />
    default:
      return (
        <ReactAwesomeReveal
          keyframes={customAnimation}
          duration={1000}
          {...commonProps}
        />
      )
  }
}

export default Reveal
