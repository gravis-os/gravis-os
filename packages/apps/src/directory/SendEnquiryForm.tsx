import React from 'react'
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Grid,
  Stack,
  Typography,
} from '@gravis-os/ui'
import { useForm } from 'react-hook-form'
import { ControlledTextField } from '@gravis-os/form'
import SendIcon from '@mui/icons-material/Send'

export type SendEnquiryFormValues = Record<string, unknown>

export interface SendEnquiryFormProps extends BoxProps {
  onSubmit?: (values: unknown) => void
  defaultValues?: SendEnquiryFormValues
  submitButtonProps?: ButtonProps
  headerProps?: BoxProps
  disableIcon?: boolean
}

const SendEnquiryForm: React.FC<SendEnquiryFormProps> = (props) => {
  const {
    defaultValues: injectedDefaultValues,
    onSubmit: injectedOnSubmit,
    submitButtonProps,
    headerProps,
    disableIcon,
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
      <Box sx={{ textAlign: 'center', mb: 2, p: 2, ...headerProps?.sx }}>
        {!disableIcon && <SendIcon color="primary" sx={{ fontSize: '3rem' }} />}
        <Typography variant="h3">{title}</Typography>
        <Typography variant="body1" color="text.secondary">
          Leave a message to get in touch with a Customer Support Specialist who
          will assist you with your enquiry in the next 24 hours.
        </Typography>
      </Box>

      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <ControlledTextField
            name="full_name"
            title="Name"
            control={control}
            placeholder="What is your name?"
            required
          />
          <div>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <ControlledTextField
                  name="email"
                  title="Email"
                  control={control}
                  placeholder="What is your email?"
                  required
                />
              </Grid>
              <Grid item md={6}>
                <ControlledTextField
                  name="mobile"
                  title="Mobile"
                  control={control}
                  placeholder="What is your mobile number?"
                  required
                />
              </Grid>
            </Grid>
          </div>
          <ControlledTextField
            name="content"
            title="Describe your question"
            control={control}
            placeholder="Maximum of 2000 characters."
            required
            multiline
            rows={4}
          />
        </Stack>

        <Button
          type="submit"
          size="large"
          variant="contained"
          fullWidth
          sx={{
            mt: 4,
            ...submitButtonProps?.sx,
          }}
          {...submitButtonProps}
        >
          {title}
        </Button>
      </form>
    </Box>
  )
}

export default SendEnquiryForm
