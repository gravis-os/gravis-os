import React from 'react'

import { Paper as MuiPaper, PaperProps as MuiPaperProps } from '@mui/material'

export interface PaperProps extends MuiPaperProps {}

const Paper: React.FC<PaperProps> = (props) => {
  return <MuiPaper {...props} />
}

export default Paper
