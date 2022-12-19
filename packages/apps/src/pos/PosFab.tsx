import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { styled } from '@mui/material/styles'
import Fab from '@mui/material/Fab'

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
})

export interface PosFabProps {}

const PosFab: React.FC<PosFabProps> = (props) => {
  return (
    <StyledFab color="secondary" aria-label="add">
      <AddIcon />
    </StyledFab>
  )
}

export default PosFab
