import React, { ReactNode, isValidElement } from 'react'

import { SvgIconProps } from '@mui/material'

import Box, { BoxProps } from '../core/Box'
import Button, { ButtonProps } from '../core/Button'
import Stack from '../core/Stack'
import Typography, { TypographyProps } from '../core/Typography'

export interface VerticalIconButtonProps {
  buttonProps?: ButtonProps
  buttonSxProps?: ButtonProps['sx']
  icon: ReactNode
  iconBoxProps?: BoxProps
  iconProps?: SvgIconProps
  title: string
  typographyProps?: TypographyProps
}

const VerticalIconButton: React.FC<VerticalIconButtonProps> = (
  props
): React.ReactElement => {
  const {
    title,
    buttonProps,
    buttonSxProps,
    icon,
    iconBoxProps,
    iconProps,
    typographyProps,
    ...rest
  } = props

  // Icon react component to check element validity and pass in props
  const IconComponent = () => (isValidElement(icon) ? icon : <>{icon}</>)
  return (
    <>
      {/* textTransform property used as buttons automatically capitalize */}
      <Button
        size="small"
        sx={{ m: 0, p: 0, textTransform: 'none', ...buttonSxProps }}
        {...buttonProps}
        {...rest}
      >
        <Stack alignItems="center" spacing={1}>
          {/* Box to create background for the icon */}
          <Box
            px={1.5}
            py={1}
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
