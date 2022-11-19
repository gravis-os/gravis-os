import React, { useState } from 'react'
import { Box, Button, ButtonProps, Dialog, DialogProps } from '@gravis-os/ui'
import SendIcon from '@mui/icons-material/Send'
import SendEnquiryForm, { SendEnquiryFormProps } from './SendEnquiryForm'

export interface SendEnquiryFormDialogButtonProps
  extends Omit<DialogProps, 'open'> {
  onConfirm?: () => Promise<void> | void
  icon?: React.ReactElement
  buttonProps?: ButtonProps
  buttonComponent?: React.ElementType
  formProps?: SendEnquiryFormProps
}

const SendEnquiryFormDialogButton: React.FC<
  SendEnquiryFormDialogButtonProps
> = (props) => {
  const {
    buttonComponent: ButtonComponent,
    icon,
    onConfirm,
    buttonProps: injectedButtonProps,
    formProps,
    ...rest
  } = props

  // State
  const [confirmationDialogOpen, setSendEnquiryFormDialogButtonOpen] =
    useState(false)
  const openDialog = () => setSendEnquiryFormDialogButtonOpen(true)
  const closeDialog = () => setSendEnquiryFormDialogButtonOpen(false)

  const title = 'Send Enquiry'

  const buttonProps = {
    onClick: openDialog,
    children: title,
    ...injectedButtonProps,
  }

  return (
    <>
      <Button
        fullWidth
        size="large"
        variant="contained"
        color="primary"
        startIcon={<SendIcon />}
        {...buttonProps}
      >
        {title}
      </Button>

      {/* Dialog */}
      <Dialog
        open={confirmationDialogOpen}
        onClose={closeDialog}
        fullWidth
        {...rest}
      >
        <Box sx={{ p: 2 }}>
          {/* Form */}
          <SendEnquiryForm
            {...formProps}
            onSubmit={async (...args) => {
              if (formProps?.onSubmit) {
                const submitted = await formProps.onSubmit(...args)
                closeDialog()
                return submitted
              }
            }}
          />
        </Box>
      </Dialog>
    </>
  )
}

export default SendEnquiryFormDialogButton
