import React from 'react'

import AddIcon from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab'
import { styled } from '@mui/material/styles'

const StyledFab = styled(Fab)({
  left: 0,
  margin: '0 auto',
  position: 'absolute',
  right: 0,
  top: -30,
  zIndex: 1,
})

export interface PosFabProps {}

const PosFab: React.FC<PosFabProps> = (props) => {
  return (
    <StyledFab aria-label="add" color="secondary">
      <AddIcon />
    </StyledFab>
  )
}

export default PosFab
