import React from 'react'
import Chip, { ChipProps } from './Chip'
import getColorFromString from '../utils/getColorFromString'

interface TagProps extends ChipProps {
  color?: string
}

const Tag: React.FC<TagProps> = (props) => {
  const { color: injectedColor, sx, ...rest } = props
  const { title, children } = rest

  const color = injectedColor || getColorFromString(children || title)

  return (
    <Chip
      sx={{
        borderRadius: 1,
        fontWeight: 'bold',
        ...sx,
      }}
      color={color}
      {...rest}
    />
  )
}

export default Tag
