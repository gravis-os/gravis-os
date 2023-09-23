import React, { useState } from 'react'

import { Box, Button, ButtonProps, Dialog, DialogProps } from '@gravis-os/ui'
import SendIcon from '@mui/icons-material/Send'

import SendEnquiryForm, { SendEnquiryFormProps } from './SendEnquiryForm'

export interface SendEnquiryFormDialogButtonProps
  extends Omit<DialogProps, 'open'> {
  buttonComponent?: React.ElementType
  buttonProps?: ButtonProps
  formProps?: SendEnquiryFormProps
  icon?: React.ReactElement
  onConfirm?: () => Promise<void> | void
}

const SendEnquiryFormDialogButton: React.FC<
  SendEnquiryFormDialogButtonProps
> = (props) => {
  const {
    buttonComponent: ButtonComponent,
    buttonProps: injectedButtonProps,
    formProps,
    icon,
    onConfirm,
    ...rest
  } = props

  // State
  const [confirmationDialogOpen, setSendEnquiryFormDialogButtonOpen] =
    useState(false)
  const openDialog = () => setSendEnquiryFormDialogButtonOpen(true)
  const closeDialog = () => setSendEnquiryFormDialogButtonOpen(false)

  const title = 'Send Enquiry'

  const buttonProps = {
    children: title,
    onClick: openDialog,
    ...injectedButtonProps,
  }

  return (
    <>
      <Button
        color="primary"
        fullWidth
        size="large"
        startIcon={<SendIcon />}
        variant="contained"
        {...buttonProps}
      >
        {title}
      </Button>

      {/* Dialog */}
      <Dialog onClose={closeDialog} open={confirmationDialogOpen} {...rest}>
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
