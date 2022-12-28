import React from 'react'
import Reveal from './Reveal'

const withReveal = (props) => (children) => {
  const { reveal } = props

  if (!reveal) return children

  return (
    <Reveal {...(typeof reveal === 'object' ? reveal : {})}>
      <div>{children}</div>
    </Reveal>
  )
}

export default withReveal
