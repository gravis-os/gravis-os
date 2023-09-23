import React from 'react'

import {
  Box,
  BoxProps,
  IconButton,
  IconButtonProps,
  Typography,
  TypographyProps,
} from '@gravis-os/ui'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Collapse, CollapseProps, SvgIconProps } from '@mui/material'

export interface AuthBoxProps extends BoxProps {
  children: React.ReactNode
  collapseProps?: Omit<CollapseProps, 'in'>
  // Collapse
  collapsible?: boolean
  disableHeader?: boolean
  expand?: boolean
  expandIconButtonProps?: Omit<IconButtonProps, 'onClick'>
  expandIconProps?: SvgIconProps
  icon?: React.ReactNode

  subtitle?: string
  subtitleProps?: TypographyProps
  title: string
  titleProps?: TypographyProps
  toggleExpand?: VoidFunction
}

const AuthBox: React.FC<AuthBoxProps> = (props) => {
  const {
    title,
    children,
    collapseProps,
    collapsible,
    disableHeader,
    expand = true,
    expandIconButtonProps,
    expandIconProps,

    icon,
    subtitle,
    subtitleProps,
    titleProps,
    toggleExpand,
    ...rest
  } = props

  return (
    <Box {...rest}>
      {/* Header */}
      {!disableHeader && (
        <>
          {icon}
          <div>
            {title && (
              <Typography gutterBottom variant="h4" {...titleProps}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                color="text.secondary"
                variant="body2"
                {...subtitleProps}
              >
                {subtitle}
              </Typography>
            )}
          </div>
        </>
      )}

      {/* Collapase */}
      {collapsible && (
        <Box flex={1} textAlign="right">
          <IconButton {...expandIconButtonProps} onClick={toggleExpand}>
            {expand ? (
              <ExpandLessIcon {...expandIconProps} />
            ) : (
              <ExpandMoreIcon {...expandIconProps} />
            )}
          </IconButton>
        </Box>
      )}

      {/* Form */}
      {collapsible ? (
        <Collapse {...collapseProps} in={expand}>
          <Box pt={4}>{children}</Box>
        </Collapse>
      ) : (
        children
      )}
    </Box>
  )
}

export default AuthBox
