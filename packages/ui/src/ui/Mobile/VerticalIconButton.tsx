import { SvgIconComponent } from '@mui/icons-material'
import { SvgIcon, SvgIconProps } from '@mui/material'
import React from 'react'
import Box, { BoxProps } from '../Box'
import Button, { ButtonProps } from '../Button'
import Stack from '../Stack'
import Typography, { TypographyProps } from '../Typography'

export interface VerticalIconButtonProps {
  label: string
  labelProps?: TypographyProps
  icon: SvgIconComponent
  iconProps?: SvgIconProps
  iconBoxProps?: BoxProps
  buttonProps?: ButtonProps
  buttonSxProps?: ButtonProps['sx']
}

const VerticalIconButton: React.FC<VerticalIconButtonProps> = (
  props
): React.ReactElement => {
  const {
    label,
    labelProps,
    icon,
    iconProps,
    iconBoxProps,
    buttonProps,
    buttonSxProps,
    ...rest
  } = props
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
            <SvgIcon component={icon} {...iconProps} />
          </Box>
          <Typography variant="inherit" {...labelProps}>
            {label}
          </Typography>
        </Stack>
      </Button>
    </>
  )
}

export default VerticalIconButton
