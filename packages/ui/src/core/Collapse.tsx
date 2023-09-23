import React from 'react'

import {
  Collapse as MuiCollapse,
  CollapseProps as MuiCollapseProps,
} from '@mui/material'

export interface CollapseProps extends MuiCollapseProps {}

const Collapse: React.FC<CollapseProps> = (props) => {
  return <MuiCollapse {...props} />
}

export default Collapse
