import React from 'react'
import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material'
import getResponsiveSxProp, {
  ResponsiveSxProp,
} from '../utils/getResponsiveSxProp'

export interface GridProps extends MuiGridProps {
  reverse?: ResponsiveSxProp
}

const Grid: React.FC<GridProps> = (props) => {
  const { sx, reverse, ...rest } = props
  const { item, container, spacing } = rest

  const gridProps = {
    xs: item && 12,
    sx: {
      ...(reverse &&
        getResponsiveSxProp({
          targetCssKey: 'flexWrap',
          cssValue: reverse,
          setCssValue: (cssValue) => {
            switch (true) {
              case cssValue === true:
                return 'wrap-reverse'
              case cssValue === false:
              default:
                return 'wrap'
            }
          },
        })),
      ...sx,
    },
    ...rest,
  }

  if (container) gridProps.spacing = spacing || 2

  return <MuiGrid {...gridProps} />
}

export default Grid
