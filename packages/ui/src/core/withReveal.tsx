import React from 'react'

import dynamic from 'next/dynamic'

const DynamicReveal = dynamic(() => import('./Reveal'))

const withReveal = (props) => (children) => {
  const { reveal } = props

  return reveal ? (
    <DynamicReveal {...(typeof reveal === 'object' ? reveal : {})}>
      <div>{children}</div>
    </DynamicReveal>
  ) : (
    children
  )
}

export default withReveal
