import React from 'react'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'
import { SvgIconProps } from '@mui/material'
import Stack from './Stack'
import Typography from './Typography'

export interface RatingsProps {
  value: number
  max?: number
  reviewCount?: number
}

const Ratings: React.FC<RatingsProps> = (props) => {
  const { value, max = 5, reviewCount } = props

  const commonProps = {
    color: 'warning',
  } as SvgIconProps

  return (
    <Stack direction="row" alignItems="center">
      {[...new Array(Math.floor(value))].map((_, i) => {
        return <StarOutlinedIcon key={`star-${i}`} {...commonProps} />
      })}
      {value % 1 > 0 && <StarHalfOutlinedIcon {...commonProps} />}
      {[...new Array(max - Math.ceil(value))].map((_, i) => {
        return (
          <StarOutlineOutlinedIcon key={`star-empty-${i}`} {...commonProps} />
        )
      })}
      {value && (
        <Typography
          variant="subtitle1"
          color="text.primary"
          lineHeight={1}
          sx={{ ml: 0.5 }}
        >
          {value}
        </Typography>
      )}
      {reviewCount && (
        <Typography
          variant="body2"
          color="text.primary"
          lineHeight={1}
          sx={{ ml: 0.5 }}
        >
          ({reviewCount} reviews)
        </Typography>
      )}
    </Stack>
  )
}

export default Ratings