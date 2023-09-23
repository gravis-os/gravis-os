import React from 'react'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined'
import { Button, ButtonProps } from '@mui/material'

import Link from './Link'

export interface ButtonLinkProps extends ButtonProps {
  href: string
  openInNewTab?: boolean
  showLinkIcon?: boolean
}

const ButtonLink: React.FC<ButtonLinkProps> = (props) => {
  const { children, href, openInNewTab, showLinkIcon, ...rest } = props

  const EndIcon = showLinkIcon ? LaunchOutlinedIcon : ArrowForwardIcon

  const defaultButtonProps = {
    ...rest,
    endIcon: showLinkIcon ? <EndIcon /> : rest.endIcon,
  }

  if (openInNewTab) {
    return (
      <Button
        component={(componentProps) => (
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
    <Button href={href} {...defaultButtonProps}>
      {children}
    </Button>
  )
}

export default ButtonLink
