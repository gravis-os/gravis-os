import React from 'react'
import {
  AppBar as MuiAppbar,
  AppBarProps as MuiAppbarProps,
} from '@mui/material'

export interface AppBarProps extends MuiAppbarProps {
  disableBoxShadow?: boolean
  disableBorderBottom?: boolean
  transparent?: boolean
  translucent?: boolean
  dark?: boolean
}

const AppBar = React.forwardRef<any, React.PropsWithChildren<AppBarProps>>(
  (props, ref) => {
    const {
      dark,
      transparent,
      translucent,
      disableBoxShadow,
      disableBorderBottom,
      sx,
      ...rest
    } = props
    return (
      <MuiAppbar
        ref={ref}
        position="sticky"
        {...((transparent || translucent) && { color: 'transparent' })}
        {...rest}
        sx={{
          zIndex: (theme) => theme.zIndex.appBar + 1,
          width: '100%',

          // Scroll
          overflowX: 'scroll',
          overflowY: 'hidden',
          '&::-webkit-scrollbar': { display: 'none' },

          // Box Shadow
          boxShadow: disableBoxShadow
            ? 'none'
            : '0 0 1px 0 rgb(0 0 0 / 5%), 0 3px 4px -2px rgb(0 0 0 / 8%)',

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
