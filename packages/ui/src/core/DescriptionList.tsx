import React from 'react'
import isNil from 'lodash/isNil'
import startCase from 'lodash/startCase'
import Stack, { StackProps } from './Stack'
import Grid from './Grid'
import Typography, { TypographyProps } from './Typography'

export interface DescriptionListItem {
  key: string
  value?: React.ReactNode
  label?: React.ReactNode
}

export interface DescriptionListProps extends Omit<StackProps, 'title'> {
  items: DescriptionListItem[]
  placeholder?: string
  title?: React.ReactNode
  titleProps?: TypographyProps
}

const DescriptionList: React.FC<DescriptionListProps> = (props) => {
  const { title, titleProps, items, sx, placeholder = '-' } = props

  if (!items?.length) return null

  return (
    <div>
      {/* Title */}
      {title && (
        <Typography variant="overline" {...titleProps}>
          {title}
        </Typography>
      )}

      {/* Stack */}
      <Stack component="dl" sx={{ my: 0, ...sx }} horizontalDividers>
        {items.map((item) => {
          const { key, value, label } = item

          return (
            <Grid key={key} container spacing={{ xs: 0, md: 1 }} sx={{ py: 1 }}>
              <Grid item md={4} lg={5} component="dt">
                {typeof label === 'string' ? (
                  <Typography variant="subtitle1" color="text.secondary">
                    {startCase(label)}
                  </Typography>
                ) : (
                  label || startCase(key)
                )}
              </Grid>
              <Grid item md={8} lg={7} component="dd">
                <Typography variant="body1">
                  {isNil(value) || value === '' ? placeholder : value}
                </Typography>
              </Grid>
            </Grid>
          )
        })}
      </Stack>
    </div>
  )
}

export default DescriptionList
