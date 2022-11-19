import React, { useState } from 'react'
import { Box, Button, ButtonProps, Dialog, DialogProps } from '@gravis-os/ui'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined'
import GetTextBackForm, { GetTextBackFormProps } from './GetTextBackForm'

export interface GetTextBackFormDialogButtonProps
  extends Omit<DialogProps, 'open'> {
  onConfirm?: () => Promise<void> | void
  icon?: React.ReactElement
  buttonProps?: ButtonProps
  buttonComponent?: React.ElementType
  formProps?: GetTextBackFormProps
}

const GetTextBackFormDialogButton: React.FC<
  GetTextBackFormDialogButtonProps
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
  const [confirmationDialogOpen, setGetTextBackFormDialogButtonOpen] =
    useState(false)
  const openDialog = () => setGetTextBackFormDialogButtonOpen(true)
  const closeDialog = () => setGetTextBackFormDialogButtonOpen(false)

  const title = 'Get Text Back'

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
        variant="outlined"
        color="primary"
        startIcon={<QuestionAnswerOutlinedIcon />}
        {...buttonProps}
      >
        {title}
      </Button>

      {/* Dialog */}
      <Dialog
        open={confirmationDialogOpen}
        onClose={closeDialog}
        maxWidth="xs"
        fullWidth
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
