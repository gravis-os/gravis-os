import React from 'react'

import isNil from 'lodash/isNil'
import startCase from 'lodash/startCase'

import Button, { ButtonProps } from './Button'
import Grid from './Grid'
import Stack, { StackProps } from './Stack'
import Typography, { TypographyProps } from './Typography'

export interface DescriptionListItem {
  key: string
  label?: React.ReactNode
  labelProps?: TypographyProps
  value?: React.ReactNode
  valueProps?: TypographyProps
}

export interface DescriptionListProps extends Omit<StackProps, 'title'> {
  actionButtonProps?: ButtonProps
  actions?: React.ReactNode
  data?: Record<string, any>
  items: DescriptionListItem[] | string[]
  justifyContent?: 'space-between'
  labelProps?: TypographyProps
  placeholder?: string
  title?: React.ReactNode
  titleProps?: TypographyProps
  valueProps?: TypographyProps
}

const DescriptionList: React.FC<DescriptionListProps> = (props) => {
  const {
    title,
    actionButtonProps,
    actions,
    data,
    items,
    justifyContent,
    labelProps: commonLabelProps,
    placeholder = '-',
    sx,
    titleProps,
    valueProps: commonValueProps,
  } = props

  if (!items?.length) return null

  const isSpaceBetween = justifyContent === 'space-between'

  return (
    <div>
      {/* Header */}
      {(title || actions || actionButtonProps) && (
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={1}
        >
          <div>
            {title && (
              <Typography gutterBottom variant="overline" {...titleProps}>
                {title}
              </Typography>
            )}
          </div>

          <div>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <div>{actions}</div>

              <div>
                {actionButtonProps && (
                  <Button
                    size="small"
                    sx={{
                      '&:hover, &:active': {
                        backgroundColor: 'transparent',
                        color: 'primary.dark',
                      },
                      mr: -2,
                    }}
                    title="Edit"
                    variant="text"
                    {...actionButtonProps}
                  />
                )}
              </div>
            </Stack>
          </div>
        </Stack>
      )}

      {/* Stack */}
      <Stack component="dl" horizontalDividers sx={{ my: 0, ...sx }}>
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
            <Typography color="text.secondary" variant="body1" {...valueProps}>
              {placeholder}
            </Typography>
          )

          // Each line is a Grid with a <dt> and <dd> pair
          return (
            <Grid container key={key} spacing={{ xs: 0, md: 1 }} sx={{ py: 1 }}>
              {/* Left */}
              <Grid component="dt" item lg={5} md={4}>
                {typeof label === 'string' ? (
                  <Typography
                    variant="subtitle1"
                    {...commonLabelProps}
                    {...labelProps}
                    sx={{
                      lineHeight: 1.25,
                      ...commonLabelProps?.sx,
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
              <Grid
                component="dd"
                item
                lg={7}
                md={8}
                sx={{
                  ...(isSpaceBetween && { textAlign: 'right' }),
                }}
              >
                {shouldShowPlaceholder ? (
                  placeholderJsx
                ) : (
                  <Typography
                    variant="body1"
                    {...commonValueProps}
                    {...valueProps}
                    sx={{
                      '&::-webkit-scrollbar': { display: 'none' },
                      // For managing overflow
                      overflow: 'scroll',
                      whiteSpace: 'nowrap',

                      ...commonValueProps?.sx,
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
