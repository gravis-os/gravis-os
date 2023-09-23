import React, { useState } from 'react'

import { CrudItem } from '@gravis-os/types'
import { Box, Button, ButtonProps, Dialog, DialogProps } from '@gravis-os/ui'

import ThreadForm, { ThreadFormProps } from './ThreadForm'

export interface ThreadFormDialogProps extends Omit<DialogProps, 'open'> {
  buttonComponent?: React.ElementType
  buttonProps?: ButtonProps
  forumCategory?: CrudItem
  forumCategorys?: CrudItem[]
  icon?: React.ReactElement
  onConfirm?: () => Promise<void> | void
  threadFormProps?: ThreadFormProps
}

const ThreadFormDialog: React.FC<ThreadFormDialogProps> = (props) => {
  const {
    buttonComponent: ButtonComponent,
    buttonProps: injectedButtonProps,
    forumCategory,
    forumCategorys,
    icon,
    onConfirm,
    threadFormProps,
    ...rest
  } = props

  // State
  const [confirmationDialogOpen, setThreadFormDialogOpen] = useState(false)
  const openDialog = () => setThreadFormDialogOpen(true)
  const closeDialog = () => setThreadFormDialogOpen(false)

  const title = 'Ask a Question'

  const buttonProps = {
    children: title,
    onClick: openDialog,
    ...injectedButtonProps,
  }

  return (
    <>
      <Button fullWidth variant="contained" {...buttonProps} />

      {/* Dialog */}
      <Dialog
        fullWidth
        onClose={closeDialog}
        open={confirmationDialogOpen}
        title={title}
        {...rest}
      >
        <Box sx={{ p: 2 }}>
          {/* Thread Form */}
          {threadFormProps && (
            <ThreadForm
              defaultValues={{
                forum_category_id: Number(forumCategory?.id) || null,
              }}
              forumCategorys={forumCategorys}
              submitButtonProps={{ variant: 'contained' }}
              {...threadFormProps}
              onSubmit={async (...args) => {
                if (threadFormProps?.onSubmit) {
                  const submitted = await threadFormProps.onSubmit(...args)
                  closeDialog()
                  return submitted
                }
              }}
            />
          )}
        </Box>
      </Dialog>
    </>
  )
}

export default ThreadFormDialog
