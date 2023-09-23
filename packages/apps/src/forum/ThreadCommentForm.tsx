import React from 'react'
import { useForm } from 'react-hook-form'

import { ControlledHtmlField } from '@gravis-os/fields'
import { Button, Card, Stack } from '@gravis-os/ui'

export interface ThreadCommentFormProps {
  onSubmit?: (values: any) => void
}

const ThreadCommentForm: React.FC<ThreadCommentFormProps> = (props) => {
  const { onSubmit: injectedOnSubmit } = props
  const form = useForm()
  const { control, handleSubmit, reset } = form

  const onSubmit = async (values) => {
    await injectedOnSubmit(values)
    reset({ content: '' })
  }

  return (
    <Card border size="small">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <ControlledHtmlField
            basic
            control={control}
            name="content"
            placeholder="What are your thoughts?"
          />

          <Button type="submit" variant="action">
            Comment
          </Button>
        </Stack>
      </form>
    </Card>
  )
}

export default ThreadCommentForm
