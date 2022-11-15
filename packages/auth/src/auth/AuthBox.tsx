import React from 'react'
import { Collapse, CollapseProps, SvgIconProps } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import {
  Box,
  BoxProps,
  IconButton,
  IconButtonProps,
  Stack,
  Typography,
  TypographyProps,
} from '@gravis-os/ui'

export interface AuthBoxProps extends BoxProps {
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
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        sx={!collapsible && { mb: 4 }}
      >
        {icon}
        <Box>
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
        </Box>
        {collapsible && (
          <Box flex={1} textAlign="right">
            <IconButton
              // eslint-disable-next-line react/no-children-prop
              children={
                expand ? (
                  <ExpandLessIcon {...expandIconProps} />
                ) : (
                  <ExpandMoreIcon {...expandIconProps} />
                )
              }
              {...expandIconButtonProps}
              onClick={toggleExpand}
            />
          </Box>
        )}
      </Stack>

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
