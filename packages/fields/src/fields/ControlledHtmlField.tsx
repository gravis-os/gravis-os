import React from 'react'
import { Control, Controller } from 'react-hook-form'

import HtmlField, { HtmlFieldProps } from './HtmlField'

export interface ControlledHtmlFieldProps
  extends Omit<HtmlFieldProps, 'value'> {
  control: Control
}

const ControlledHtmlField: React.FC<ControlledHtmlFieldProps> = (props) => {
  const { control, ...rest } = props

  return (
    <Controller
      control={control}
      render={({ field }) => {
        return (
          <HtmlField
            {...(field as any)}
            // Need to set initialValue for ReactQuill @link: https://github.com/zenoamaro/react-quill/issues/498
            value={field.value ?? ''}
            {...rest}
          />
        )
      }}
      {...rest}
    />
  )
}

export default ControlledHtmlField
