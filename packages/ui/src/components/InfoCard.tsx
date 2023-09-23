import React, { ReactNode, isValidElement } from 'react'

import Card, { CardProps } from '../core/Card'
import Chip from '../core/Chip'
import Stack from '../core/Stack'
import Typography, { TypographyProps } from '../core/Typography'
import withHref from '../core/withHref'
import { renderReactNodeOrString } from '../utils'

/**
 * Property of the structured InfoCard content section.
 *
 * @prop {ReactNode} title
 * @prop {ReactNode} description
 */
export interface InfoCardItemProps {
  /** Renders a prestyled Typography if string is given, else it will render the given ReactNode */
  description?: ReactNode
  /** Renders a prestyled Typography if string is given, else it will render the given ReactNode */
  title: ReactNode
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
  /**
   * If string is given, it will render in a preset styled chip.
   * Else, whole React node will be rendered on the right side of the Card header
   */
  chip?: ReactNode
  /** URL destination when the InfoCard is clicked */
  href?: string
  /** Icons displayed to the left of the title */
  icon?: ReactNode
  /** Prestructured card content reprented by items */
  items: InfoCardItemProps[]
  key: string
  title: ReactNode
  titleTypographyProps?: TypographyProps
}

const InfoCard: React.FC<InfoCardProps> = (props): React.ReactElement => {
  const { title, chip, href, icon, items, key, titleTypographyProps, ...rest } =
    props

  /* Card Header */
  const structuredTitle = isValidElement(title) ? (
    title
  ) : (
    <Stack alignItems="center" direction="row" justifyContent="space-between">
      {/* Icon and Title */}
      <Stack alignItems="center" direction="row" spacing={1}>
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
          label={chip}
          sx={{ backgroundColor: 'primary.dark', borderRadius: 1 }}
        />
      )}
    </Stack>
  )
  const cardProps: CardProps = {
    title: structuredTitle,
    key,
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
