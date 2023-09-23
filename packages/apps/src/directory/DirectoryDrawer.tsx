import React from 'react'

import {
  SwipeableDrawer,
  SwipeableDrawerProps,
  useMediaQuery,
  useTheme,
} from '@mui/material'

export interface DirectoryDrawerProps {
  children?: React.ReactNode
  height?: number | string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  sx?: SwipeableDrawerProps['sx']
  variant?: SwipeableDrawerProps['variant']
  width: number | string
}

const DirectoryDrawer: React.FC<DirectoryDrawerProps> = (props) => {
  const { children, height = '100%', open, setOpen, sx, variant, width } = props

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })

  return (
    <SwipeableDrawer
      open={open}
      variant={variant || (isDesktop ? 'permanent' : 'temporary')}
      {...(!isDesktop && {
        onClose: () => setOpen(false),
        onOpen: () => setOpen(true),
      })}
      sx={
        {
          '&, & .MuiDrawer-paper': {
            width: '100%',
            ...(isDesktop && {
              height,
              position: 'sticky',
              top: 48, // FilterAppBar height is always at 48
              transition: (theme) =>
                theme.transitions.create(['width'], {
                  duration:
                    theme.transitions.duration[
                      open ? 'leavingScreen' : 'enteringScreen'
                    ],
                  easing: theme.transitions.easing[open ? 'sharp' : 'easeOut'],
                }),
              width: open ? width : 0,
            }),
            ...sx,
          },
        } as SwipeableDrawerProps['sx']
      }
    >
      {children}
    </SwipeableDrawer>
  )
}

export default DirectoryDrawer
