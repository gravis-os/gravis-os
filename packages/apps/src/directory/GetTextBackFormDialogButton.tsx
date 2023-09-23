import React, { useState } from 'react'

import { Box, Button, ButtonProps, Dialog, DialogProps } from '@gravis-os/ui'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined'

import GetTextBackForm, { GetTextBackFormProps } from './GetTextBackForm'

export interface GetTextBackFormDialogButtonProps
  extends Omit<DialogProps, 'open'> {
  buttonComponent?: React.ElementType
  buttonProps?: ButtonProps
  formProps?: GetTextBackFormProps
  icon?: React.ReactElement
  onConfirm?: () => Promise<void> | void
}

const GetTextBackFormDialogButton: React.FC<
  GetTextBackFormDialogButtonProps
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
  const [confirmationDialogOpen, setGetTextBackFormDialogButtonOpen] =
    useState(false)
  const openDialog = () => setGetTextBackFormDialogButtonOpen(true)
  const closeDialog = () => setGetTextBackFormDialogButtonOpen(false)

  const title = 'Get Text Back'

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
        startIcon={<QuestionAnswerOutlinedIcon />}
        variant="outlined"
        {...buttonProps}
      >
        {title}
      </Button>

      {/* Dialog */}
      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={closeDialog}
        open={confirmationDialogOpen}
        {...rest}
      >
        <Box sx={{ p: 2 }}>
          {/* Form */}
          <GetTextBackForm
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

export default GetTextBackFormDialogButton
