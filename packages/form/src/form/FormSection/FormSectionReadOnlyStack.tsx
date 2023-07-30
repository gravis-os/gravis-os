import React from 'react'
import { Stack, StackProps, Typography } from '@gravis-os/ui'

export interface FormSectionFileProps {
  isFiles?: boolean
  /**
   * @default 'public'
   */
  bucketName?: string
}

export interface FormSectionReadOnlyStackProps
  extends Omit<StackProps, 'title'> {
  title?: React.ReactNode
  label: React.ReactNode
  disableTitle?: boolean
  fileProps?: FormSectionFileProps
}

const getDisplayTitle = (title) => {
  switch (true) {
    case typeof title === 'boolean':
      return title ? 'Yes' : 'No'
    case typeof title === 'string' || React.isValidElement(title):
      return title
    case typeof title === 'number' && !Number.isNaN(title):
      return title
    default:
      return '-'
  }
}

const getDisplayTitles = (titles) =>
  Array.isArray(titles)
    ? titles.map((title) => getDisplayTitle(title))
    : [getDisplayTitle(titles)]

const FormSectionReadOnlyStack: React.FC<FormSectionReadOnlyStackProps> = (
  props
) => {
  const { disableTitle, title, label, children, ...rest } = props

  const displayTitles = getDisplayTitles(title)

  return (
    <Stack spacing={1}>
      <Stack spacing={0.5} {...rest}>
        {/* Overline */}
        <Typography variant="overline" color="text.secondary">
          {label}
        </Typography>

        {/* Title */}
        {!disableTitle &&
          displayTitles.map((title, index) => (
            <Typography key={`${title}-${index}`} variant="subtitle1">
              {title}
            </Typography>
          ))}
      </Stack>

      {children}
    </Stack>
  )
}

export default FormSectionReadOnlyStack
