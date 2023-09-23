import React from 'react'
import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@gravis-os/fields'
import { Box, Button, ButtonProps, Stack, Typography } from '@gravis-os/ui'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined'

export type GetTextBackFormValues = Record<string, unknown>

export interface GetTextBackFormProps {
  defaultValues?: GetTextBackFormValues
  onSubmit?: (values: unknown) => void
  submitButtonProps?: ButtonProps
}

const GetTextBackForm: React.FC<GetTextBackFormProps> = (props) => {
  const {
    defaultValues: injectedDefaultValues,
    onSubmit: injectedOnSubmit,
    submitButtonProps,
  } = props

  // Form
  const defaultValues = { ...injectedDefaultValues, mobile: '' }
  const form = useForm<GetTextBackFormValues>({ defaultValues })
  const { control, handleSubmit, reset } = form

  // Methods
  const onSubmit = async (values) => {
    await injectedOnSubmit(values)
    reset(defaultValues)
  }

  return (
    <>
      <Box sx={{ mb: 2, p: 2 }} textAlign="center">
        <QuestionAnswerOutlinedIcon color="primary" sx={{ fontSize: '3rem' }} />
        <Typography variant="h3">Get Text Back</Typography>
        <Typography color="text.secondary" variant="body1">
          Enter your mobile number to get a text back from a sales specialist in
          the next 24 hours.
        </Typography>
      </Box>

      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <ControlledTextField
            control={control}
            name="mobile"
            placeholder="What is your mobile number?"
            required
          />

          <Button
            size="large"
            type="submit"
            variant="contained"
            {...submitButtonProps}
          >
            Get Text Back
          </Button>
        </Stack>
      </form>
    </>
  )
}

export default GetTextBackForm
