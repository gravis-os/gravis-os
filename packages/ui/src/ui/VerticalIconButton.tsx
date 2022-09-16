import { SvgIconProps } from '@mui/material'
import React, { isValidElement, ReactNode } from 'react'
import Box, { BoxProps } from './Box'
import Button, { ButtonProps } from './Button'
import Stack from './Stack'
import Typography, { TypographyProps } from './Typography'

export interface VerticalIconButtonProps {
  title: string
  typographyProps?: TypographyProps
  icon: ReactNode
  iconProps?: SvgIconProps
  iconBoxProps?: BoxProps
  buttonProps?: ButtonProps
  buttonSxProps?: ButtonProps['sx']
}

const VerticalIconButton: React.FC<VerticalIconButtonProps> = (
  props
): React.ReactElement => {
  const {
    title,
    typographyProps,
    icon,
    iconProps,
    iconBoxProps,
    buttonProps,
    buttonSxProps,
    ...rest
  } = props

  // Icon react component to check element validity and pass in props
  const IconComponent = () => (isValidElement(icon) ? icon : <>{icon}</>)
  return (
    <>
      {/* textTransform property used as buttons automatically capitalize */}
      <Button
        size="small"
        sx={{ p: 0, m: 0, textTransform: 'none', ...buttonSxProps }}
        {...buttonProps}
        {...rest}
      >
        <Stack spacing={1} alignItems="center">
          {/* Box to create background for the icon */}
          <Box
            py={1}
            px={1.5}
            sx={{ backgroundColor: 'primary.light' }}
            {...iconBoxProps}
          >
            <IconComponent {...iconProps} />
          </Box>
          <Typography variant="inherit" {...typographyProps}>
            {title}
          </Typography>
        </Stack>
      </Button>
    </>
  )
}

export default VerticalIconButton
