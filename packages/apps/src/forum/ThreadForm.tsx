import React from 'react'
import { useForm } from 'react-hook-form'

import {
  ControlledAutocompleteField,
  ControlledHtmlField,
  ControlledTextField,
} from '@gravis-os/fields'
import { CrudItem } from '@gravis-os/types'
import { Button, ButtonProps, Stack } from '@gravis-os/ui'

export type ThreadFormValues = Record<string, unknown> & {
  forum_category_id?: number
}

export interface ThreadFormProps {
  defaultValues?: ThreadFormValues
  forumCategorys?: CrudItem[]
  onSubmit?: (values: any) => void
  submitButtonProps?: ButtonProps
}

const ThreadForm: React.FC<ThreadFormProps> = (props) => {
  const {
    defaultValues: injectedDefaultValues,
    forumCategorys,
    onSubmit: injectedOnSubmit,
    submitButtonProps,
  } = props

  // Form
  const defaultValues = { ...injectedDefaultValues, title: '', content: '' }
  const form = useForm<ThreadFormValues>({ defaultValues })
  const { control, handleSubmit, reset } = form

  // Methods
  const onSubmit = async (values) => {
    await injectedOnSubmit(values)
    reset(defaultValues)
  }

  const forumCategoryOptions = forumCategorys?.map(({ id, title }) => ({
    id,
    label: title,
  }))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1}>
        <ControlledTextField
          control={control}
          disableLabel
          name="title"
          placeholder="What is your question?"
          required
          sx={{ mb: 1 }}
          variant="standard"
        />

        {!defaultValues?.forum_category_id && forumCategorys && (
          <ControlledAutocompleteField
            control={control}
            name="forum_category_id"
            options={forumCategoryOptions}
            required
          />
        )}

        <ControlledHtmlField
          basic
          control={control}
          name="content"
          placeholder="Tell us more"
        />

        <Button type="submit" variant="action" {...submitButtonProps}>
          Ask Question
        </Button>
      </Stack>
    </form>
  )
}

export default ThreadForm
