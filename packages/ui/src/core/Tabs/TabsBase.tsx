import React from 'react'
import { Tabs as MuiTabs, TabsProps as MuiTabsProps } from '@mui/material'
import getHoverColor from '../../utils/getHoverColor'

export interface TabsBaseProps extends MuiTabsProps {
  borderBottom?: boolean
  disableMinHeight?: boolean
  hoverColor?: string
}

const TabsBase: React.FC<TabsBaseProps> = (props) => {
  const { borderBottom, hoverColor, disableMinHeight, sx, ...rest } = props
  return (
    <MuiTabs
      sx={{
        ...(disableMinHeight && { '&, & .MuiTab-root': { minHeight: 0 } }),
        ...(hoverColor && {
          '& .MuiTab-root:hover': {
            color: getHoverColor(hoverColor),
          },
        }),
        ...(borderBottom && { borderBottom: 1, borderColor: 'divider' }),
        ...sx,
      }}
      {...rest}
    />
  )
}

export default TabsBase
