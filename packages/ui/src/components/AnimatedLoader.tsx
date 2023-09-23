import React from 'react'

import { keyframes } from '@emotion/react'

import Box from '../core/Box'

const bounceKeyframes = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 3px, 0); }
  100% { transform: translate3d(0, 0, 0); }
`

export interface AnimatedLoaderProps {
  children: React.ReactNode
}

const AnimatedLoader: React.FC<AnimatedLoaderProps> = (props) => {
  const { children } = props
  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: 'neutral.900',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        left: 0,
        p: 3,
        position: 'fixed',
        top: 0,
        width: '100vw',
        zIndex: 2000,
      }}
    >
      <Box
        sx={{
          animation: `${bounceKeyframes} 1s ease-in-out infinite`,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default AnimatedLoader
