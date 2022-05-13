import React from 'react'
import { Button, ButtonProps, Link } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined'
import RouterLink from 'next/link'

export interface ButtonLinkProps extends ButtonProps {
  href: string
  openInNewTab?: boolean
  showLinkIcon?: boolean
}

const ButtonLink: React.FC<ButtonLinkProps> = props => {
  const { href, children, openInNewTab, showLinkIcon, ...rest } = props

  const EndIcon = showLinkIcon ? LaunchOutlinedIcon : ArrowForwardIcon

  const defaultButtonProps = {
    ...rest,
    endIcon: showLinkIcon ? <EndIcon /> : rest.endIcon,
  }

  if (openInNewTab) {
    return (
      <Button
        component={componentProps => (
          <Link
            {...componentProps}
            href={href}
            target="_blank"
            underline="none"
          />
        )}
        {...defaultButtonProps}
      >
        {children}
      </Button>
    )
  }

  return (
    <RouterLink passHref href={href}>
      <Button {...defaultButtonProps}>{children}</Button>
    </RouterLink>
  )
}

export default ButtonLink
