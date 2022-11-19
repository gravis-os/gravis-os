import { ArrowBackIos } from '@mui/icons-material'
import { SvgIconProps } from '@mui/material'
import React from 'react'
import Button, { ButtonProps } from '../core/Button'
import Typography, { TypographyProps } from '../core/Typography'

/**
 * Property of the BackButton component.
 *
 * @extends ButtonProps
 * @prop {string} title
 * @prop {TypographyProps} typographyProps?
 * @prop {SvgIconProps} arrowIconProps?
 * @prop {boolean} disableArrow?
 * @prop {string} href?
 * @prop {ButtonProps['sx']} buttonSxProps
 */
export interface BackButtonProps extends ButtonProps {
  /** Text displayed that represents the button */
  title: string
  /** Property of the title component */
  typographyProps?: TypographyProps
  /** Property of the arrow icon displayed next to the title */
  arrowIconProps?: SvgIconProps
  /** Removes the arrow icon if set to true */
  disableArrow?: boolean
  /** Redirect destination when the button is clicked */
  href?: string
  /** Sx property of the button component */
  buttonSxProps?: ButtonProps['sx']
}

/**
 * Button component containing an arrow icon which is used mainly for users to click to navigate to the previous page.
 * @param props Property of the BackButton, primarily concerned with the styling of the component and extends ButtonProps
 * @returns ReactElement to be rendered
 */
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
