import React from 'react'
import RRFade from 'react-reveal/Fade'

export type RevealProps =
  | boolean
  | {
      cascade?: boolean
      bottom?: boolean
      left?: boolean
      children?: React.ReactNode
    }

const Reveal: React.FC<RevealProps> = (props) => {
  return <RRFade bottom duration={1500} distance="24px" {...props} />
}

export default Reveal
