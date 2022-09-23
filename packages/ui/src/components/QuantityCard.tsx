import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined'
import { TextField } from '@mui/material'
import { isString } from 'lodash'
import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import Card, { CardProps } from '../core/Card'
import Grid from '../core/Grid'
import Image from '../core/Image'
import Stack from '../core/Stack'
import { getStorageImageUrl, renderReactNodeOrString } from '../utils'

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
  title: ReactNode
  quantity: string
  /** Function which modifies the value of quantity */
  setQuantity?: (value: string) => void
  /** Text displayed before the title */
  subtitle?: ReactNode
  /** Caption text displayed below the subtitle */
  description?: ReactNode
  /** URL of the image displayed on the left side of the component */
  imageSrc?: string
  /** Displays an error icon next to the quantity value if set to true */
  hasError?: boolean
}

const QuantityCard: React.FC<QuantityCardProps> = (
  props
): React.ReactElement => {
  const {
    title,
    quantity: injectedQuantity,
    setQuantity: injectedSetQuantity,
    subtitle,
    description,
    imageSrc,
    hasError,
    ...rest
  } = props

  const [quantity, setQuantity] = useState<string>(injectedQuantity ?? '0')

  const handleQuantityOnChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement
    // Set error to false if changed
    return injectedSetQuantity ? injectedSetQuantity(value) : setQuantity(value)
  }

  // Get image URL
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    const getImage = async () => {
      const fetchedImageUrl = await getStorageImageUrl(imageSrc)
      setImageUrl(fetchedImageUrl)
    }
    getImage()
  }, [imageSrc])

  return (
    // Override default padding
    <Card disablePadding padding={1.5} {...rest}>
      <Grid container spacing={1} display="flex" alignItems="center">
        <Grid item xs={3}>
          <Image
            src={imageUrl ?? imageSrc}
            height="100%"
            width="100%"
            sx={{ alignItems: 'center', display: 'flex' }}
          />
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {renderReactNodeOrString(title, { variant: 'subtitle2' })}
            {renderReactNodeOrString(subtitle, {
              variant: 'body2',
              color: 'text.disabled',
            })}
            {renderReactNodeOrString(description, {
              variant: 'caption',
              color: 'text.disabled',
            })}
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            value={
              // Only use injectedQuantity if injectedSetQuantity is provided too to prevent input not changing
              isString(injectedQuantity) && injectedSetQuantity
                ? injectedQuantity
                : quantity
            }
            onChange={handleQuantityOnChange}
            InputProps={{
              inputProps: { sx: { textAlign: 'center' }, inputMode: 'numeric' },
              ...(hasError && {
                endAdornment: <ErrorOutlinedIcon color="error" />,
              }),
            }}
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default QuantityCard
