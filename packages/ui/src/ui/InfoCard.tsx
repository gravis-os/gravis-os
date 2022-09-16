import React, { isValidElement, ReactNode } from 'react'
import { renderReactNodeOrString } from '../utils'
import Card, { CardProps } from './Card'
import Chip from './Chip'
import Stack from './Stack'
import Typography, { TypographyProps } from './Typography'

export interface InfoCardItemProps {
  title: ReactNode
  description?: ReactNode
}

export interface InfoCardProps extends CardProps {
  key: string
  title: ReactNode
  titleTypographyProps?: TypographyProps
  chip?: ReactNode
  icon?: ReactNode
  items: InfoCardItemProps[]
}

const InfoCard: React.FC<InfoCardProps> = (props): React.ReactElement => {
  const { key, title, titleTypographyProps, chip, icon, items, ...rest } = props

  /* Card Header */
  const structuredTitle = isValidElement(title) ? (
    title
  ) : (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      {/* Icon and Title */}
      <Stack direction="row" spacing={1}>
        {icon}
        <Typography variant="subtitle1" {...titleTypographyProps}>
          {title}
        </Typography>
      </Stack>
      {/* Chip */}
      {isValidElement(chip) ? (
        chip
      ) : (
        <Chip
          color="primary"
          sx={{ borderRadius: 2, backgroundColor: 'primary.dark' }}
          label={chip}
        />
      )}
    </Stack>
  )

  return (
    <>
      <Card key={key} title={structuredTitle} {...rest}>
        <Stack spacing={2}>
          {items.map((item) => {
            const { title, description } = item
            return (
              <Stack spacing={1}>
                {renderReactNodeOrString(title, { variant: 'subtitle2' })}
                {renderReactNodeOrString(description, { variant: 'body2' })}
              </Stack>
            )
          })}
        </Stack>
      </Card>
    </>
  )
}

export default InfoCard
