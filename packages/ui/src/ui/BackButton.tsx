import { ArrowBackIos } from '@mui/icons-material'
import { SvgIconProps } from '@mui/material'
import React from 'react'
import Button, { ButtonProps } from './Button'
import Typography, { TypographyProps } from './Typography'

export interface BackButtonProps extends ButtonProps {
  title: string
  typographyProps?: TypographyProps
  arrowIconProps?: SvgIconProps
  disableArrow?: boolean
  href?: string
  buttonSxProps?: ButtonProps['sx']
}

const BackButton: React.FC<BackButtonProps> = (props): React.ReactElement => {
  const {
    title,
    typographyProps,
    arrowIconProps,
    disableArrow,
    href,
    buttonSxProps,
    ...rest
  } = props
  return (
    <>
      <Button
        sx={{ textTransform: 'none', ...buttonSxProps }}
        href={href}
        {...(!disableArrow && {
          startIcon: <ArrowBackIos htmlColor="grey" {...arrowIconProps} />,
        })}
        {...rest}
      >
        <Typography color="black" variant="h4" {...typographyProps}>
          {title}
        </Typography>
      </Button>
    </>
  )
}

export default BackButton
