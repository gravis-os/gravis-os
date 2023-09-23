import React from 'react'

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'
import {
  Backdrop,
  Button,
  ButtonProps,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  PopperProps,
  Portal,
  Slide,
  Typography,
} from '@mui/material'
import {
  PopupState,
  bindHover,
  bindPopper,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks'

import Link, { LinkProps } from '../Link'

export type NavItemClickFunction = (e: React.MouseEvent, item: any) => void

export interface RecursiveNavItemInterface {
  href?: string
  key: string
  label?: React.ReactNode
  onClick?: NavItemClickFunction
  title?: React.ReactNode
}

export interface HeaderButtonWithMenuProps {
  buttonProps?: ButtonProps

  disableBackdrop?: boolean
  disableNewTabIcon?: boolean

  fullWidth?: boolean
  isOpenOnHover?: boolean
  items?: RecursiveNavItemInterface[]
  linkProps?: LinkProps
  popperProps?: Omit<PopperProps, 'open'>
  renderItems?: ({
    popupState,
  }: {
    popupState: PopupState
  }) => React.ReactElement
  sx?: ButtonProps['sx']
  title?: React.ReactNode
}

const HeaderButtonWithMenu: React.FC<HeaderButtonWithMenuProps> = (props) => {
  const {
    title,
    buttonProps,
    disableBackdrop,
    fullWidth,
    isOpenOnHover,
    items,
    linkProps,
    popperProps,
    renderItems,
    sx,
  } = props

  // Refs
  const anchorRef = React.useRef(null)
  const containerRef = React.useRef(null)

  // Popper
  const popupState = usePopupState({
    variant: 'popper',
    ...(typeof title === 'string' && { popupId: title }),
  })

  const bindAction = isOpenOnHover ? bindHover : bindTrigger
  const Transition = fullWidth ? Slide : Grow
  const PaperProps = isOpenOnHover
    ? {
        onMouseEnter: popupState.open,
        onMouseLeave: popupState.close,
      }
    : {}

  // Render Menu Content
  const renderMenuContent = () => {
    const isMegaMenu = Boolean(renderItems)

    switch (true) {
      case isMegaMenu: {
        return renderItems({ popupState })
      }
      default: {
        return (
          <MenuList
            sx={{
              minWidth: 150,
              paddingBottom: 0,
              paddingTop: 0,
            }}
          >
            {items.map((item, i) => {
              const { title, href, label, onClick: injectedOnClick } = item

              const key = `menu-item-${i}`

              const handleClick = (e) => {
                popupState.close()
                if (injectedOnClick) injectedOnClick(e, item)
              }

              const navItemJsx = (
                <MenuItem
                  key={key}
                  onClick={handleClick}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                    borderBottom: (theme) =>
                      `1px solid ${theme.palette.divider}`,
                    pb: 1,
                    pt: 1,
                  }}
                >
                  <Typography variant="button">{title || label}</Typography>
                </MenuItem>
              )

              if (injectedOnClick) return navItemJsx

              return (
                <Link href={href} key={key} underline="none" {...linkProps}>
                  {navItemJsx}
                </Link>
              )
            })}
          </MenuList>
        )
      }
    }
  }

  return (
    <>
      <Button
        ref={anchorRef}
        {...bindAction(popupState)}
        color="inherit"
        endIcon={<ArrowDropDownOutlinedIcon sx={{ ml: -1 }} />}
        {...buttonProps}
        sx={
          {
            ...sx,
            ...buttonProps?.sx,
          } as ButtonProps['sx']
        }
      >
        {title}
      </Button>

      <Popper
        {...bindPopper(popupState)}
        anchorEl={anchorRef.current}
        placement={fullWidth ? 'bottom' : 'bottom-start'}
        sx={{
          zIndex: (theme) => theme.zIndex.appBar,
          ...(fullWidth && {
            maxWidth: '100%',
            pointerEvents: 'none',
            width: '100vw',
          }),
        }}
        transition
        {...popperProps}
      >
        {({ placement, TransitionProps }) => (
          <ClickAwayListener onClickAway={popupState.close} ref={containerRef}>
            <Transition
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper square {...PaperProps} sx={{ pointerEvents: 'auto' }}>
                {renderMenuContent()}
              </Paper>
            </Transition>
          </ClickAwayListener>
        )}
      </Popper>

      {!disableBackdrop && containerRef && (
        <Portal container={containerRef.current}>
          <Backdrop
            open={popupState.isOpen}
            sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}
          />
        </Portal>
      )}
    </>
  )
}

export default HeaderButtonWithMenu
