import React from 'react'
import { Button, Card, Stack } from '@gravis-os/ui'
import { useForm } from 'react-hook-form'
import {
  ControlledHtmlField,
  ControlledTextField,
  ControlledAutocompleteField,
} from '@gravis-os/form'
import { CrudItem } from '@gravis-os/types'

export type ThreadFormValues = Record<string, unknown> & {
  forum_category_id?: number
}

export interface ThreadFormProps {
  onSubmit?: (values: any) => void
  forumCategorys?: CrudItem[]
  defaultValues?: ThreadFormValues
}

const ThreadForm: React.FC<ThreadFormProps> = (props) => {
  const {
    defaultValues: injectedDefaultValues,
    onSubmit: injectedOnSubmit,
    forumCategorys,
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
    <Card border size="small">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          {!defaultValues?.forum_category_id && forumCategorys && (
            <ControlledAutocompleteField
              name="forum_category_id"
              control={control}
              options={forumCategoryOptions}
              required
            />
          )}

          <ControlledTextField
            name="title"
            control={control}
            placeholder="What is your question about?"
            required
          />

          <ControlledHtmlField
            name="content"
            control={control}
            placeholder="Describe your question"
            basic
          />

          <Button type="submit" variant="action">
            Ask Question
          </Button>
        </Stack>
      </form>
    </Card>
  )
}

export default ThreadForm
