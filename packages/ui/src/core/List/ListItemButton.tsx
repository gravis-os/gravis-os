import React from 'react'
import {
  ListItemButton as MuiListItemButton,
  ListItemButtonProps as MuiListItemButtonProps,
} from '@mui/material'
import flowRight from 'lodash/flowRight'
import withHref from '../withHref'
import withTooltip from '../withTooltip'

export interface ListItemButtonProps extends MuiListItemButtonProps {
  href?: string
  tooltip?: string
}

const ListItemButton: React.FC<ListItemButtonProps> = (props) => {
  const { href, tooltip, ...rest } = props
  const childrenJsx = <MuiListItemButton {...rest} />
  return flowRight([withHref({ href }), withTooltip({ tooltip })])(childrenJsx)
}

export default ListItemButton
