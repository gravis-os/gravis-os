import React, { isValidElement, ReactNode } from 'react'
import { renderReactNodeOrString } from '../utils'
import Card, { CardProps } from './Card'
import Chip from './Chip'
import Stack from './Stack'
import Typography, { TypographyProps } from './Typography'
import withHref from './withHref'

/**
 * Property of the structured InfoCard content section.
 *
 * @prop {ReactNode} title
 * @prop {ReactNode} description
 */
export interface InfoCardItemProps {
  /** Renders a prestyled Typography if string is given, else it will render the given ReactNode */
  title: ReactNode
  /** Renders a prestyled Typography if string is given, else it will render the given ReactNode */
  description?: ReactNode
}

/**
 * Property of the InfoCard.
 *
 * @extends {CardProps}
 * @prop {string} key
 * @prop {ReactNode} title
 * @prop {InfoCardItemProps[]} items
 * @prop {TypographyProps} titleTypographyProps?
 * @prop {ReactNode} chip?
 * @prop {ReactNode} icon?
 * @prop {string} href?
 */
export interface InfoCardProps extends CardProps {
  key: string
  title: ReactNode
  /** Prestructured card content reprented by items */
  items: InfoCardItemProps[]
  titleTypographyProps?: TypographyProps
  /**
   * If string is given, it will render in a preset styled chip.
   * Else, whole React node will be rendered on the right side of the Card header
   */
  chip?: ReactNode
  /** Icons displayed to the left of the title */
  icon?: ReactNode
  /** URL destination when the InfoCard is clicked */
  href?: string
}

const InfoCard: React.FC<InfoCardProps> = (props): React.ReactElement => {
  const { key, title, titleTypographyProps, chip, icon, items, href, ...rest } =
    props

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
          sx={{ borderRadius: 1, backgroundColor: 'primary.dark' }}
          label={chip}
        />
      )}
    </Stack>
  )
  const cardProps: CardProps = {
    key,
    title: structuredTitle,
    ...(href && { sx: { cursor: 'pointer' } }),
  }
  const childrenJsx = (
    <Card {...cardProps} {...rest}>
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
  )

  return <>{withHref({ href })(childrenJsx)}</>
}

export default InfoCard
