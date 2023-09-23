import React from 'react'

import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'
import { SvgIconProps } from '@mui/material'

import Stack, { StackProps } from './Stack'
import Typography from './Typography'

export interface RatingsProps extends StackProps {
  disableText?: boolean
  max?: number
  reviewCount?: number
  value: number
}

const Ratings: React.FC<RatingsProps> = (props) => {
  const { disableText, max = 5, reviewCount, value, ...rest } = props

  const commonProps = {
    color: 'warning',
  } as SvgIconProps

  return (
    <Stack alignItems="center" direction="row" {...rest}>
      {Array.from({ length: Math.floor(value) }).map((_, i) => {
        return <StarOutlinedIcon key={`star-${i}`} {...commonProps} />
      })}
      {value % 1 > 0 && <StarHalfOutlinedIcon {...commonProps} />}
      {Array.from({ length: max - Math.ceil(value) }).map((_, i) => {
        return (
          <StarOutlineOutlinedIcon key={`star-empty-${i}`} {...commonProps} />
        )
      })}
      {!disableText && value && (
        <Typography
          color="text.primary"
          lineHeight={1}
          sx={{ ml: 0.5 }}
          variant="subtitle1"
        >
          {value}
        </Typography>
      )}
      {!disableText && reviewCount && (
        <Typography
          color="text.primary"
          lineHeight={1}
          sx={{ ml: 0.5 }}
          variant="body2"
        >
          ({reviewCount} reviews)
        </Typography>
      )}
    </Stack>
  )
}

export default Ratings
