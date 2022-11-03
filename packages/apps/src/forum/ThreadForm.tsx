import React from 'react'
import { Button, Card, Stack } from '@gravis-os/ui'
import { useForm } from 'react-hook-form'
import { ControlledHtmlField, ControlledTextField } from '@gravis-os/form'

export interface ThreadFormProps {
  onSubmit?: (values: any) => void
}

const ThreadForm: React.FC<ThreadFormProps> = (props) => {
  const { onSubmit: injectedOnSubmit } = props
  const form = useForm()
  const { control, handleSubmit, reset } = form

  const onSubmit = async (values) => {
    await injectedOnSubmit(values)
    reset({ title: '', content: '' })
  }

  return (
    <Card border size="small">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
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
