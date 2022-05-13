import React from 'react'
import {
  CardHeader as MuiCardHeader,
  CardHeaderProps as MuiCardHeaderProps,
  Divider,
} from '@mui/material'

export interface CardHeaderProps extends MuiCardHeaderProps {
  divider?: boolean
}

const CardHeader: React.FC<CardHeaderProps> = props => {
  const { sx, divider, ...rest } = props

  return (
    <>
      <MuiCardHeader
        sx={{
          p: 2,
          '& .MuiCardHeader-action': {
            marginTop: 0,
            marginRight: 0,
          },
          '& .MuiCardHeader-avatar': { alignSelf: 'flex-start' },
          ...sx,
        }}
        {...rest}
      />
      {divider && <Divider />}
    </>
  )
}

export default CardHeader
