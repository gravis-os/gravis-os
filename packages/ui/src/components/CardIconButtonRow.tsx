import React from 'react'

import Card, { CardProps } from '../core/Card'
import Grid, { GridProps } from '../core/Grid'
import VerticalIconButton, {
  VerticalIconButtonProps,
} from './VerticalIconButton'

/**
 * Property of the CardIconButtonRow
 *
 * @extends CardProps
 * @prop {VerticalIconButtonProps[]} items
 * @prop {GridProps} gridProps
 */
export interface CardIconButtonRowProps extends CardProps {
  /** Property of the grid component */
  gridProps?: GridProps
  /** List of VerticalIconButtons */
  items: VerticalIconButtonProps[]
}

/**
 * Row of IconButton wrapped in a Card component.
 */
const CardIconButtonRow: React.FC<CardIconButtonRowProps> = (
  props
): React.ReactElement => {
  const { gridProps, items, ...rest } = props
  const itemSize = Math.floor(12 / items.length)
  return (
    <Card {...rest}>
      <Grid
        alignItems="center"
        container
        justifyContent="center"
        {...gridProps}
      >
        {items.map((item) => {
          const { title: label, icon, ...rest } = item
          return (
            <Grid item textAlign="center" xs={itemSize}>
              <VerticalIconButton icon={icon} title={label} {...rest} />
            </Grid>
          )
        })}
      </Grid>
    </Card>
  )
}

export default CardIconButtonRow
