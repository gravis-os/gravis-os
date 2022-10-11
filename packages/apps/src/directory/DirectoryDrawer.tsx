import React from 'react'
import {
  SwipeableDrawer,
  SwipeableDrawerProps,
  SxProps,
  useMediaQuery,
  useTheme,
} from '@mui/material'

export interface DirectoryDrawerProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  width: number | string
  height?: number | string
  children?: React.ReactNode
  sx?: SwipeableDrawerProps['sx']
  variant?: SwipeableDrawerProps['variant']
}

const DirectoryDrawer: React.FC<DirectoryDrawerProps> = (props) => {
  const { variant, open, setOpen, width, height = '100%', sx, children } = props

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
              width: open ? width : 0,
              top: 48, // FilterAppBar height is always at 48
              position: 'sticky',
              transition: (theme) =>
                theme.transitions.create(['width'], {
                  easing: theme.transitions.easing[open ? 'sharp' : 'easeOut'],
                  duration:
                    theme.transitions.duration[
                      open ? 'leavingScreen' : 'enteringScreen'
                    ],
                }),
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
