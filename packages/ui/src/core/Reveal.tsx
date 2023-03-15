import React from 'react'
import {
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

export interface RevealProps extends ReactAwesomeRevealProps {}

const Reveal: React.FC<RevealProps> = (props) => {
  return (
    <ReactAwesomeReveal
      triggerOnce
      keyframes={customAnimation}
      duration={1500}
      {...props}
    />
  )
}

export default Reveal
