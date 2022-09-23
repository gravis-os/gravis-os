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
  /** List of VerticalIconButtons */
  items: VerticalIconButtonProps[]
  /** Property of the grid component */
  gridProps?: GridProps
}

/**
 * Row of IconButton wrapped in a Card component.
 */
const CardIconButtonRow: React.FC<CardIconButtonRowProps> = (
  props
): React.ReactElement => {
  const { items, gridProps, ...rest } = props
  const itemSize = Math.floor(12 / items.length)
  return (
    <Card {...rest}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        {...gridProps}
      >
        {items.map((item) => {
          const { title: label, icon, ...rest } = item
          return (
            <Grid item xs={itemSize} textAlign="center">
              <VerticalIconButton title={label} icon={icon} {...rest} />
            </Grid>
          )
        })}
      </Grid>
    </Card>
  )
}

export default CardIconButtonRow
