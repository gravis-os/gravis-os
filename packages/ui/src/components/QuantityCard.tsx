import React, { ChangeEvent, ReactNode, useState } from 'react'

import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined'
import { TextField } from '@mui/material'
import isString from 'lodash/isString'

import Card, { CardProps } from '../core/Card'
import Grid from '../core/Grid'
import Stack from '../core/Stack'
import { renderReactNodeOrString } from '../utils'

/**
 * Property of the QuantityCard component.
 *
 * @prop {ReactNode} title
 * @prop {string} quantity
 * @prop {(value: string) => void} setQuantity?
 * @prop {ReactNode} subtitle?
 * @prop {ReactNode} description?
 * @prop {string} imageSrc?
 * @prop {boolean} hasError?
 */
export interface QuantityCardProps extends CardProps {
  /** Caption text displayed below the subtitle */
  description?: ReactNode
  /** Displays an error icon next to the quantity value if set to true */
  hasError?: boolean
  /**
   * ReactNode to display the image
   */
  image?: React.ReactNode
  /** URL of the image displayed on the left side of the component */
  imageSrc?: string
  quantity: string
  /** Function which modifies the value of quantity */
  setQuantity?: (value: string) => void
  /** Text displayed before the title */
  subtitle?: ReactNode
  title: ReactNode
}

const QuantityCard: React.FC<QuantityCardProps> = (
  props
): React.ReactElement => {
  const {
    title,
    description,
    hasError,
    image,
    imageSrc,
    quantity: injectedQuantity,
    setQuantity: injectedSetQuantity,
    subtitle,
    ...rest
  } = props

  const [quantity, setQuantity] = useState<string>(injectedQuantity ?? '0')

  const handleQuantityOnChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement
    // Set error to false if changed
    return injectedSetQuantity ? injectedSetQuantity(value) : setQuantity(value)
  }

  return (
    // Override default padding
    <Card disablePadding padding={1.5} {...rest}>
      <Grid alignItems="center" container display="flex" spacing={1}>
        <Grid item xs={3}>
          {image}
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {renderReactNodeOrString(title, { variant: 'subtitle2' })}
            {renderReactNodeOrString(subtitle, {
              color: 'text.disabled',
              variant: 'body2',
            })}
            {renderReactNodeOrString(description, {
              color: 'text.disabled',
              variant: 'caption',
            })}
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <TextField
            InputProps={{
              inputProps: { inputMode: 'numeric', sx: { textAlign: 'center' } },
              ...(hasError && {
                endAdornment: <ErrorOutlinedIcon color="error" />,
              }),
            }}
            onChange={handleQuantityOnChange}
            type="number"
            value={
              // Only use injectedQuantity if injectedSetQuantity is provided too to prevent input not changing
              isString(injectedQuantity) && injectedSetQuantity
                ? injectedQuantity
                : quantity
            }
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default QuantityCard
