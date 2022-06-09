import React from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import MenuButton, { MenuButtonProps } from './MenuButton'
import IconButton, { IconButtonProps } from './IconButton'

export interface MoreIconButtonProps extends Omit<MenuButtonProps, 'title'> {
  orientation?: 'vertical' | 'horizontal'
  size?: IconButtonProps['size']
}

const MoreIconButton: React.FC<MoreIconButtonProps> = (props) => {
  const { orientation, ...rest } = props
  const { size } = rest

  const iconProps = size && { fontSize: size }
  const iconJsx =
    orientation === 'horizontal' ? (
      <MoreHorizOutlinedIcon {...iconProps} />
    ) : (
      <MoreVertOutlinedIcon {...iconProps} />
    )

  return (
    <MenuButton button={IconButton} title={iconJsx} tooltip="More" {...rest} />
  )
}

export default MoreIconButton
