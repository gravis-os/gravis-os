import React, { forwardRef } from 'react'
import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material'
import getResponsiveSxProp, {
  ResponsiveSxProp,
} from '../utils/getResponsiveSxProp'

export interface GridProps extends MuiGridProps {
  reverse?: ResponsiveSxProp
  component?: React.ElementType
}

const Grid: React.FC<GridProps> = forwardRef((props, ref) => {
  const { sx, reverse, ...rest } = props
  const { item, container, spacing } = rest

  const gridProps = {
    ref,
    xs: item && 12,
    sx: {
      ...(reverse &&
        getResponsiveSxProp({
          targetCssKey: 'flexDirection',
          cssValue: reverse,
          setCssValue: (cssValue) => {
            switch (true) {
              case cssValue === true:
                return 'row-reverse'
              case cssValue === false:
              default:
                return 'row'
            }
          },
        })),

      ...sx,
    },
    ...rest,
    // Set default spacing = 2, else override with spacing prop
    ...(container && {
      spacing:
        typeof spacing === 'number' || typeof spacing === 'object'
          ? spacing
          : { xs: 0, md: 2 },
    }),
  }

  return <MuiGrid {...gridProps} />
})

export default Grid
