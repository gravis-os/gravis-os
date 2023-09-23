import React, { ReactNode } from 'react'

import { printNumber } from '@gravis-os/utils'
import { SxProps } from '@mui/material'

import Box from './Box'
import Divider from './Divider'
import Stack, { StackProps } from './Stack'
import Typography, { TypographyProps } from './Typography'

const getTitleVariantBySize = (size): TypographyProps['variant'] => {
  switch (size) {
    case 'large': {
      return 'h2'
    }
    default: {
      return 'h3'
    }
  }
}

const getOverlineVariantBySize = (size): TypographyProps['variant'] => {
  switch (size) {
    case 'large': {
      return 'overline'
    }
    default: {
      return 'overline'
    }
  }
}

const getSubtitleVariantBySize = (size): TypographyProps['variant'] => {
  switch (size) {
    case 'large': {
      return 'body1'
    }
    default: {
      return 'body2'
    }
  }
}

export interface StatStackItem {
  formatType?: 'amount' | string
  icon?: ReactNode
  key: string
  overline?: ReactNode
  overlineTypographyProps?: TypographyProps
  stackProps?: StackProps
  subtitle?: ReactNode
  subtitleTypographyProps?: TypographyProps
  title: ReactNode
  titleTypographyProps?: TypographyProps
}

export interface StatStackProps extends StackProps {
  itemStackProps?: StackProps
  items: StatStackItem[]
  overlineTypographyProps?: TypographyProps
  reverse?: boolean
  size?: 'large' | 'medium' | 'small'
  spacing?: StackProps['spacing']
  subtitleTypographyProps?: TypographyProps
  titleTypographyProps?: TypographyProps
  variant?: 'contained' | 'outlined'
}

const StatStack: React.FC<StatStackProps> = (props) => {
  const {
    items,
    itemStackProps,
    overlineTypographyProps,
    reverse,
    size,
    spacing = 0.5,
    subtitleTypographyProps,
    sx,
    titleTypographyProps,
    ...rest
  } = props

  return (
    <Stack
      direction="row"
      divider={<Divider flexItem orientation="vertical" />}
      justifyContent="space-around"
      sx={{ textAlign: 'center', width: '100%', ...sx }}
      {...rest}
    >
      {items.map((item) => {
        const { title, formatType, icon, key, overline, stackProps, subtitle } =
          item

        return (
          <React.Fragment key={key}>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
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
                      color="text.secondary"
                      variant={getOverlineVariantBySize(size)}
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
