import React from 'react'
import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@gravis-os/fields'
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Grid,
  Stack,
  Typography,
} from '@gravis-os/ui'
import SendIcon from '@mui/icons-material/Send'

export type SendEnquiryFormValues = Record<string, unknown>

export interface SendEnquiryFormProps extends BoxProps {
  defaultValues?: SendEnquiryFormValues
  disableIcon?: boolean
  headerProps?: BoxProps
  onSubmit?: (values: unknown) => void
  submitButtonProps?: ButtonProps
}

const SendEnquiryForm: React.FC<SendEnquiryFormProps> = (props) => {
  const {
    defaultValues: injectedDefaultValues,
    disableIcon,
    headerProps,
    onSubmit: injectedOnSubmit,
    submitButtonProps,
    sx,
  } = props

  // Form
  const defaultValues = { ...injectedDefaultValues, mobile: '' }
  const form = useForm<SendEnquiryFormValues>({ defaultValues })
  const { control, handleSubmit, reset } = form

  // Methods
  const onSubmit = async (values) => {
    await injectedOnSubmit(values)
    reset(defaultValues)
  }

  const title = 'Send Enquiry'

  return (
    <Box sx={sx}>
      <Box sx={{ mb: 2, p: 2, textAlign: 'center', ...headerProps?.sx }}>
        {!disableIcon && <SendIcon color="primary" sx={{ fontSize: '3rem' }} />}
        <Typography variant="h3">{title}</Typography>
        <Typography color="text.secondary" variant="body1">
          Leave a message to get in touch with a Customer Support Specialist who
          will assist you with your enquiry in the next 24 hours.
        </Typography>
      </Box>

      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <ControlledTextField
            control={control}
            name="full_name"
            placeholder="What is your name?"
            required
            title="Name"
          />
          <div>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <ControlledTextField
                  control={control}
                  name="email"
                  placeholder="What is your email?"
                  required
                  title="Email"
                />
              </Grid>
              <Grid item md={6}>
                <ControlledTextField
                  control={control}
                  name="mobile"
                  placeholder="What is your mobile number?"
                  required
                  title="Mobile"
                />
              </Grid>
            </Grid>
          </div>
          <ControlledTextField
            control={control}
            multiline
            name="content"
            placeholder="Maximum of 2000 characters."
            required
            rows={4}
            title="Describe your question"
          />
        </Stack>

        <Button
          fullWidth
          size="large"
          sx={{
            mt: 4,
            ...submitButtonProps?.sx,
          }}
          type="submit"
          variant="contained"
          {...submitButtonProps}
        >
          {title}
        </Button>
      </form>
    </Box>
  )
}

export default SendEnquiryForm
