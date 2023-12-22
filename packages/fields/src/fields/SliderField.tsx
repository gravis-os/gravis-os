import React from 'react'

import {
  Slider as MuiSlider,
  SliderProps as MuiSliderProps,
} from '@mui/material'

export interface SliderFieldProps extends MuiSliderProps {}

export default function SliderField(props: SliderFieldProps) {
  return <MuiSlider {...props} />
}
