import React from 'react'
import {
  Box,
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
} from '@mui/material'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'
import {
  bindHover,
  bindPopper,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import Link from '../Link'

export type NavItemClickFunction = (
  e: React.MouseEvent,
  item: RecursiveNavItemInterface
) => void

export interface RecursiveNavItemInterface {
  title: string | JSX.Element
  href?: string
  onClick?: NavItemClickFunction
}

export interface HeaderButtonWithMenuProps {
  name: string
  title: string | JSX.Element

  items?: RecursiveNavItemInterface[]
  renderItems?: ({ popupState: PopupState }) => JSX.Element

  isOpenOnHover?: boolean
  fullWidth?: boolean
  ButtonProps?: ButtonProps
  disableBackdrop?: boolean
}

const HeaderButtonWithMenu: React.FC<HeaderButtonWithMenuProps> = (props) => {
  const {
    disableBackdrop,
    name,
    title,
    items,
    renderItems,
    fullWidth,
    isOpenOnHover,
    ButtonProps,
  } = props

  // Refs
  const anchorRef = React.useRef(null)
  const containerRef = React.useRef(null)

  // Popper
  const popupState = usePopupState({ variant: 'popper', popupId: name })

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

              const navItemJSX = (
                <MenuItem
                  key={key}
                  onClick={handleClick}
                  sx={{
                    pt: 1,
                    pb: 1,
                    borderBottom: (theme) =>
                      `1px solid ${theme.palette.divider}`,
                    '&:hover': { color: (theme) => theme.palette.primary.main },
                  }}
                >
                  <Typography variant="button">{item.title}</Typography>
                </MenuItem>
              )

              if (injectedOnClick) return navItemJSX

              return (
                <Link href={item.href} key={key}>
                  {navItemJSX}
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
        {...ButtonProps}
      >
        {title}
      </Button>

      <Box
        component={Popper}
        {...bindPopper(popupState)}
        anchorEl={anchorRef.current}
        placement={fullWidth ? 'bottom' : 'bottom-start'}
        sx={{
          zIndex: (theme) => theme.zIndex.appBar,
          ...(fullWidth && { width: '100vw', pointerEvents: 'none' }),
        }}
        transition
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
      </Box>

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
