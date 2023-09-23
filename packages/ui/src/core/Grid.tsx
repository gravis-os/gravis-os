import React, { forwardRef } from 'react'

import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material'

import getResponsiveSxProp, {
  ResponsiveSxProp,
} from '../utils/getResponsiveSxProp'

export interface GridProps extends MuiGridProps {
  component?: React.ElementType
  reverse?: ResponsiveSxProp
  rowReverse?: ResponsiveSxProp
}

const Grid: React.FC<GridProps> = forwardRef((props, ref) => {
  const { reverse, rowReverse, sx, ...rest } = props
  const { container, item, spacing } = rest

  const gridProps = {
    xs: item && 12,
    ref,
    sx: {
      ...(typeof reverse === 'boolean' &&
        getResponsiveSxProp({
          cssValue: reverse,
          setCssValue: (cssValue) => {
            switch (true) {
              case cssValue === true: {
                return 'wrap-reverse'
              }
              case cssValue === false:
              default: {
                return 'wrap'
              }
            }
          },
          targetCssKey: 'flexWrap',
        })),

      // Row reverse and wrap reverse are not the same
      ...(typeof rowReverse === 'boolean' &&
        getResponsiveSxProp({
          cssValue: rowReverse,
          setCssValue: (cssValue) => {
            switch (true) {
              case cssValue === true: {
                return 'row-reverse'
              }
              case cssValue === false:
              default: {
                return 'row'
              }
            }
          },
          targetCssKey: 'flexDirection',
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
