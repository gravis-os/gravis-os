import React from 'react'
import {
  Container as MuiContainer,
  ContainerProps as MuiContainerProps,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

export interface ContainerProps extends MuiContainerProps {
  disableGuttersOnMobile?: boolean
}

const Container: React.FC<ContainerProps> = (props) => {
  const { disableGuttersOnMobile, sx, ...rest } = props

  const theme = useTheme()

  return (
    <MuiContainer
      sx={{
        ...(disableGuttersOnMobile && {
          [theme.breakpoints.down('md')]: {
            '&&': { px: 0 },
          },
        }),
      }}
      {...rest}
    />
  )
}

export default Container
