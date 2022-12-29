import React from 'react'
import { Button, ButtonProps, Stack } from '@gravis-os/ui'
import { useForm } from 'react-hook-form'
import {
  ControlledHtmlField,
  ControlledTextField,
  ControlledAutocompleteField,
} from '@gravis-os/fields'
import { CrudItem } from '@gravis-os/types'

export type ThreadFormValues = Record<string, unknown> & {
  forum_category_id?: number
}

export interface ThreadFormProps {
  onSubmit?: (values: any) => void
  forumCategorys?: CrudItem[]
  defaultValues?: ThreadFormValues
  submitButtonProps?: ButtonProps
}

const ThreadForm: React.FC<ThreadFormProps> = (props) => {
  const {
    defaultValues: injectedDefaultValues,
    onSubmit: injectedOnSubmit,
    forumCategorys,
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
          name="title"
          control={control}
          placeholder="What is your question?"
          disableLabel
          required
          variant="standard"
          sx={{ mb: 1 }}
        />

        {!defaultValues?.forum_category_id && forumCategorys && (
          <ControlledAutocompleteField
            name="forum_category_id"
            control={control}
            options={forumCategoryOptions}
            required
          />
        )}

        <ControlledHtmlField
          name="content"
          control={control}
          placeholder="Tell us more"
          basic
        />

        <Button type="submit" variant="action" {...submitButtonProps}>
          Ask Question
        </Button>
      </Stack>
    </form>
  )
}

export default ThreadForm
