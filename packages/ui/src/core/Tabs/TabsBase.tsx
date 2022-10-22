import React from 'react'
import get from 'lodash/get'
import { Tabs as MuiTabs, TabsProps as MuiTabsProps } from '@mui/material'

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
            color: ({ palette }) =>
              get(
                palette,
                hoverColor.includes('.') ? hoverColor : `${hoverColor}.main`
              ),
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
