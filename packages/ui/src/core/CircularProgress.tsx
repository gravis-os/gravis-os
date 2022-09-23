import React from 'react'
import {
  CircularProgress as MuiCircularProgress,
  CircularProgressProps as MuiCircularProgressProps,
} from '@mui/material'
import styleConfig from '../config/styleConfig'
import Box from './Box'

export interface CircularProgressProps extends MuiCircularProgressProps {
  fullScreen?: boolean
}

const CircularProgress: React.FC<CircularProgressProps> = (props) => {
  const { fullScreen, ...rest } = props
  const childrenJsx = <MuiCircularProgress {...rest} />
  return fullScreen ? (
    <Box
      center
      sx={{
        width: '100%',
        height: `calc(100vh - ${styleConfig.headerHeight}px - ${styleConfig.layoutGutterTop}px)`,
      }}
    >
      {childrenJsx}
    </Box>
  ) : (
    childrenJsx
  )
}

export default CircularProgress
