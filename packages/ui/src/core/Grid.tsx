import React, { forwardRef } from 'react'
import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material'
import getResponsiveSxProp, {
  ResponsiveSxProp,
} from '../utils/getResponsiveSxProp'

export interface GridProps extends MuiGridProps {
  reverse?: ResponsiveSxProp
  rowReverse?: ResponsiveSxProp
  component?: React.ElementType
}

const Grid: React.FC<GridProps> = forwardRef((props, ref) => {
  const { sx, reverse, rowReverse, ...rest } = props
  const { item, container, spacing } = rest

  const gridProps = {
    ref,
    xs: item && 12,
    sx: {
      ...(typeof reverse === 'boolean' &&
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

      // Row reverse and wrap reverse are not the same
      ...(typeof rowReverse === 'boolean' &&
        getResponsiveSxProp({
          targetCssKey: 'flexDirection',
          cssValue: rowReverse,
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
