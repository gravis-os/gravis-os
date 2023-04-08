import React from 'react'
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
  Portal,
  Slide,
  Typography,
  PopperProps,
} from '@mui/material'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'
import {
  bindHover,
  bindPopper,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import Link, { LinkProps } from '../Link'

export type NavItemClickFunction = (e: React.MouseEvent, item: any) => void

export interface RecursiveNavItemInterface {
  key: string
  title?: React.ReactNode
  label?: React.ReactNode
  href?: string
  onClick?: NavItemClickFunction
}

export interface HeaderButtonWithMenuProps {
  title?: React.ReactNode

  items?: RecursiveNavItemInterface[]
  renderItems?: ({ popupState: PopupState }) => React.ReactElement

  isOpenOnHover?: boolean
  fullWidth?: boolean
  disableNewTabIcon?: boolean
  buttonProps?: ButtonProps
  sx?: ButtonProps['sx']
  linkProps?: LinkProps
  disableBackdrop?: boolean
  popperProps?: Omit<PopperProps, 'open'>
}

const HeaderButtonWithMenu: React.FC<HeaderButtonWithMenuProps> = (props) => {
  const {
    disableBackdrop,
    sx,
    title,
    items,
    renderItems,
    fullWidth,
    isOpenOnHover,
    buttonProps,
    linkProps,
    popperProps,
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
      case isMegaMenu:
        return renderItems({ popupState })
      default:
        return (
          <MenuList
            sx={{
              minWidth: 150,
              paddingTop: 0,
              paddingBottom: 0,
            }}
          >
            {items.map((item, i) => {
              const { onClick: injectedOnClick } = item

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
                    pt: 1,
                    pb: 1,
                    borderBottom: (theme) =>
                      `1px solid ${theme.palette.divider}`,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <Typography variant="button">
                    {item.title || item.label}
                  </Typography>
                </MenuItem>
              )

              if (injectedOnClick) return navItemJsx

              return (
                <Link
                  href={item.href}
                  key={key}
                  underline="none"
                  {...linkProps}
                >
                  {navItemJsx}
                </Link>
              )
            })}
          </MenuList>
        )
    }
  }

  return (
    <>
      <Button
        ref={anchorRef}
        {...bindAction(popupState)}
        color="inherit"
        endIcon={<ArrowDropDownOutlinedIcon />}
        sx={
          {
            ...sx,
            ...buttonProps?.sx,
          } as ButtonProps['sx']
        }
        {...buttonProps}
      >
        {title}
      </Button>

      <Popper
        {...bindPopper(popupState)}
        transition
        anchorEl={anchorRef.current}
        placement={fullWidth ? 'bottom' : 'bottom-start'}
        sx={{
          zIndex: (theme) => theme.zIndex.appBar,
          ...(fullWidth && {
            width: '100vw',
            maxWidth: '100%',
            pointerEvents: 'none',
          }),
        }}
        {...popperProps}
      >
        {({ TransitionProps, placement }) => (
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
