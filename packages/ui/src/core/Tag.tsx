import React from 'react'

import getColorFromString from '../utils/getColorFromString'
import Chip, { ChipProps } from './Chip'

interface TagProps extends ChipProps {
  color?: string
}

const Tag: React.FC<TagProps> = (props) => {
  const { color: injectedColor, sx, ...rest } = props
  const { title } = rest

  const color = injectedColor || getColorFromString(title)

  return (
    <Chip
      color={color}
      sx={{
        borderRadius: 1,
        fontWeight: 'bold',
        ...sx,
      }}
      {...rest}
    />
  )
}

export default Tag
