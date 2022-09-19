import React from 'react'
import Card from './Card'
import Grid, { GridProps } from './Grid'
import VerticalIconButton, {
  VerticalIconButtonProps,
} from './VerticalIconButton'

export interface MobileCardIconButtonRowProps {
  items: VerticalIconButtonProps[]
  gridProps?: GridProps
}

const CardIconButtonRow: React.FC<MobileCardIconButtonRowProps> = (
  props
): React.ReactElement => {
  const { items, gridProps, ...rest } = props
  const itemSize = Math.floor(12 / items.length)
  return (
    <Card>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        {...gridProps}
        {...rest}
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