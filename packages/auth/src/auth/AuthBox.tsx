import React from 'react'
import { Collapse, CollapseProps, SvgIconProps } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import {
  Box,
  BoxProps,
  IconButton,
  IconButtonProps,
  Typography,
  TypographyProps,
} from '@gravis-os/ui'

export interface AuthBoxProps extends BoxProps {
  disableHeader?: boolean
  title: string
  titleProps?: TypographyProps
  subtitle?: string
  subtitleProps?: TypographyProps
  collapseProps?: Omit<CollapseProps, 'in'>
  children: React.ReactNode
  icon?: React.ReactNode

  // Collapse
  collapsible?: boolean
  expand?: boolean
  toggleExpand?: VoidFunction
  expandIconButtonProps?: Omit<IconButtonProps, 'onClick'>
  expandIconProps?: SvgIconProps
}

const AuthBox: React.FC<AuthBoxProps> = (props) => {
  const {
    title,
    subtitle,
    children,
    titleProps,
    subtitleProps,
    collapseProps,
    icon,
    disableHeader,

    collapsible,
    expand = true,
    toggleExpand,
    expandIconButtonProps,
    expandIconProps,
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
              <Typography variant="h4" gutterBottom {...titleProps}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
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
