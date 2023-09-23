import React from 'react'

import {
  AppBar as MuiAppbar,
  AppBarProps as MuiAppbarProps,
} from '@mui/material'

export interface AppBarProps extends MuiAppbarProps {
  disableBorderBottom?: boolean
  disableBoxShadow?: boolean
  translucent?: boolean
  transparent?: boolean
}

const AppBar = React.forwardRef<any, React.PropsWithChildren<AppBarProps>>(
  (props, ref) => {
    const {
      disableBorderBottom,
      disableBoxShadow,
      sx,
      translucent,
      transparent,
      ...rest
    } = props

    return (
      <MuiAppbar
        color="inherit"
        position="sticky"
        ref={ref}
        {...((transparent || translucent) && { color: 'transparent' })}
        {...rest}
        sx={{
          '&::-webkit-scrollbar': { display: 'none' },
          // Box Shadow
          boxShadow: disableBoxShadow
            ? 'none'
            : '0 0 1px 0 rgb(0 0 0 / 5%), 0 3px 4px -2px rgb(0 0 0 / 8%)',

          // Scroll
          overflowX: 'scroll',
          overflowY: 'hidden',
          width: '100%',

          zIndex: (theme) => theme.zIndex.appBar + 1,

          // BorderBottom
          ...(!disableBorderBottom && {
            borderBottom: '1px solid',
            borderBottomColor: 'divider',
          }),

          // Translucent
          ...(translucent && {
            backdropFilter: 'saturate(180%) blur(5px)',
            backfaceVisibility: 'hidden',
            perspective: '1000',
            transform: 'translateZ(0)',
            ...(!transparent && {
              backgroundColor: ({ palette }) =>
                palette.mode === 'dark'
                  ? 'rgba(0,0,0,.5)'
                  : 'hsla(0,0%,100%,.8)',
            }),
          }),

          ...sx,
        }}
        {...rest}
      />
    )
  }
)

export default AppBar
