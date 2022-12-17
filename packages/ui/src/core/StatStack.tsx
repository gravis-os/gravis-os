import React, { ReactNode } from 'react'
import { printNumber } from '@gravis-os/utils'
import { SxProps } from '@mui/material'
import Stack, { StackProps } from './Stack'
import Box from './Box'
import Divider from './Divider'
import Typography, { TypographyProps } from './Typography'

const getTitleVariantBySize = (size): TypographyProps['variant'] => {
  switch (size) {
    case 'large':
      return 'h2'
    default:
      return 'h3'
  }
}

const getOverlineVariantBySize = (size): TypographyProps['variant'] => {
  switch (size) {
    case 'large':
      return 'overline'
    default:
      return 'overline'
  }
}

const getSubtitleVariantBySize = (size): TypographyProps['variant'] => {
  switch (size) {
    case 'large':
      return 'body1'
    default:
      return 'body2'
  }
}

export interface StatStackItem {
  key: string
  title: ReactNode
  overline?: ReactNode
  subtitle?: ReactNode
  formatType?: 'amount' | string
  titleTypographyProps?: TypographyProps
  subtitleTypographyProps?: TypographyProps
  overlineTypographyProps?: TypographyProps
  icon?: ReactNode
  stackProps?: StackProps
}

export interface StatStackProps extends StackProps {
  variant?: 'contained' | 'outlined'
  items: StatStackItem[]
  size?: 'small' | 'medium' | 'large'
  reverse?: boolean
  titleTypographyProps?: TypographyProps
  subtitleTypographyProps?: TypographyProps
  overlineTypographyProps?: TypographyProps
  itemStackProps?: StackProps
  spacing?: StackProps['spacing']
}

const StatStack: React.FC<StatStackProps> = (props) => {
  const {
    items,
    titleTypographyProps,
    subtitleTypographyProps,
    overlineTypographyProps,
    size,
    sx,
    reverse,
    itemStackProps,
    spacing = 0.5,
    ...rest
  } = props

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      sx={{ width: '100%', textAlign: 'center', ...sx }}
      divider={<Divider orientation="vertical" flexItem />}
      {...rest}
    >
      {items.map((item) => {
        const { key, title, overline, subtitle, formatType, icon, stackProps } =
          item

        return (
          <React.Fragment key={key}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              {...itemStackProps}
              {...stackProps}
              sx={
                {
                  width: 'auto',
                  ...itemStackProps?.sx,
                  ...stackProps?.sx,
                } as SxProps
              }
            >
              {icon}

              <Box>
                <Stack
                  direction={reverse ? 'column-reverse' : 'column'}
                  spacing={spacing}
                >
                  {/* Overline */}
                  {overline && (
                    <Typography
                      variant={getOverlineVariantBySize(size)}
                      color="text.secondary"
                      {...overlineTypographyProps}
                      {...item.overlineTypographyProps}
                      sx={
                        {
                          textTransform: 'uppercase',
                          ...overlineTypographyProps?.sx,
                          ...item.overlineTypographyProps?.sx,
                        } as SxProps
                      }
                    >
                      {overline}
                    </Typography>
                  )}

                  {/* Title */}
                  <Typography
                    variant={getTitleVariantBySize(size)}
                    {...titleTypographyProps}
                    {...item.titleTypographyProps}
                  >
                    {typeof title === 'number'
                      ? printNumber(title, { type: formatType })
                      : title}
                  </Typography>
                </Stack>

                {/* Subtitle */}
                {subtitle && (
                  <Typography
                    variant={getSubtitleVariantBySize(size)}
                    {...subtitleTypographyProps}
                    {...item.subtitleTypographyProps}
                    sx={
                      {
                        mt: 1.5,
                        ...subtitleTypographyProps?.sx,
                        ...item.subtitleTypographyProps?.sx,
                      } as SxProps
                    }
                  >
                    {subtitle}
                  </Typography>
                )}
              </Box>
            </Stack>
          </React.Fragment>
        )
      })}
    </Stack>
  )
}

export default StatStack
