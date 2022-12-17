import React from 'react'
import isNil from 'lodash/isNil'
import startCase from 'lodash/startCase'
import Stack, { StackProps } from './Stack'
import Grid from './Grid'
import Typography, { TypographyProps } from './Typography'
import Button, { ButtonProps } from './Button'

export interface DescriptionListItem {
  key: string
  value?: React.ReactNode
  label?: React.ReactNode
  labelProps?: TypographyProps
  valueProps?: TypographyProps
}

export interface DescriptionListProps extends Omit<StackProps, 'title'> {
  data?: Record<string, any>
  items: DescriptionListItem[] | string[]
  placeholder?: string
  title?: React.ReactNode
  titleProps?: TypographyProps
  actions?: React.ReactNode
  actionButtonProps?: ButtonProps
}

const DescriptionList: React.FC<DescriptionListProps> = (props) => {
  const {
    data,
    actions,
    actionButtonProps,
    title,
    titleProps,
    items,
    sx,
    placeholder = '-',
  } = props

  if (!items?.length) return null

  return (
    <div>
      {/* Header */}
      {(title || actions || actionButtonProps) && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <div>
            {title && (
              <Typography variant="overline" gutterBottom {...titleProps}>
                {title}
              </Typography>
            )}
          </div>

          <div>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <div>{actions}</div>

              <div>
                {actionButtonProps && (
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      mr: -2,
                      '&:hover, &:active': {
                        backgroundColor: 'transparent',
                        color: 'primary.dark',
                      },
                    }}
                    title="Edit"
                    {...actionButtonProps}
                  />
                )}
              </div>
            </Stack>
          </div>
        </Stack>
      )}

      {/* Stack */}
      <Stack component="dl" sx={{ my: 0, ...sx }} horizontalDividers>
        {items.map((injectedItem) => {
          const item =
            typeof injectedItem === 'string'
              ? { key: injectedItem }
              : injectedItem

          const {
            key,
            label: injectedLabel,
            labelProps,
            value: injectedValue,
            valueProps,
          } = item

          const label = injectedLabel || startCase(key)

          const valueFromData = data?.[key]
          const value = injectedValue || valueFromData

          const shouldShowPlaceholder = isNil(value) || value === ''
          const placeholderJsx = (
            <Typography variant="body1" color="text.secondary" {...valueProps}>
              {placeholder}
            </Typography>
          )

          // Each line is a Grid with a <dt> and <dd> pair
          return (
            <Grid key={key} container spacing={{ xs: 0, md: 1 }} sx={{ py: 1 }}>
              {/* Left */}
              <Grid item md={4} lg={5} component="dt">
                {typeof label === 'string' ? (
                  <Typography
                    variant="subtitle1"
                    {...labelProps}
                    sx={{
                      lineHeight: 1.25,
                      ...labelProps?.sx,
                    }}
                  >
                    {label}
                  </Typography>
                ) : (
                  label
                )}
              </Grid>

              {/* Right */}
              <Grid item md={8} lg={7} component="dd">
                {shouldShowPlaceholder ? (
                  placeholderJsx
                ) : (
                  <Typography
                    variant="body1"
                    {...valueProps}
                    sx={{
                      // For managing overflow
                      overflow: 'scroll',
                      whiteSpace: 'nowrap',
                      '&::-webkit-scrollbar': { display: 'none' },

                      ...valueProps?.sx,
                    }}
                  >
                    {value}
                  </Typography>
                )}
              </Grid>
            </Grid>
          )
        })}
      </Stack>
    </div>
  )
}

export default DescriptionList
