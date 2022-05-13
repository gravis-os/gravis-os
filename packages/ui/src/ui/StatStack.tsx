import React from 'react'
import Stack, { StackProps } from './Stack'
import Box from './Box'
import Divider from './Divider'
import Typography, { TypographyProps } from './Typography'
import printNumber from '../utils/printNumber'

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
  title: number | string
  overline: string
  subtitle?: string
  formatType?: 'amount' | string
}

export interface StatStackProps extends StackProps {
  variant?: 'contained' | 'outlined'
  items: StatStackItem[]
  size?: 'small' | 'middle' | 'large'
  reverse?: boolean
  titleTypographyProps?: TypographyProps
  subtitleTypographyProps?: TypographyProps
  overlineTypographyProps?: TypographyProps
}

const StatStack: React.FC<StatStackProps> = props => {
  const {
    items,
    titleTypographyProps,
    subtitleTypographyProps,
    overlineTypographyProps,
    size,
    sx,
    reverse,
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
      {items.map(item => {
        const { key, title, overline, subtitle, formatType } = item

        return (
          <React.Fragment key={key}>
            <Box>
              <Stack
                direction={reverse ? 'column-reverse' : 'column'}
                spacing={0.5}
              >
                {/* Overline */}
                <Typography
                  variant={getOverlineVariantBySize(size)}
                  color="text.secondary"
                  {...overlineTypographyProps}
                  sx={{
                    textTransform: 'uppercase',
                    ...overlineTypographyProps?.sx,
                  }}
                >
                  {overline}
                </Typography>

                {/* Title */}
                <Typography
                  variant={getTitleVariantBySize(size)}
                  {...titleTypographyProps}
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
                  sx={{ mt: 1.5, ...subtitleTypographyProps?.sx }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          </React.Fragment>
        )
      })}
    </Stack>
  )
}

export default StatStack
