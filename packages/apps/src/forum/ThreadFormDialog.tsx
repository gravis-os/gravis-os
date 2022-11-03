import React, { useState } from 'react'
import { Box, Button, ButtonProps, Dialog, DialogProps } from '@gravis-os/ui'
import { CrudItem } from '@gravis-os/types'
import ThreadForm, { ThreadFormProps } from './ThreadForm'

export interface ThreadFormDialogProps extends Omit<DialogProps, 'open'> {
  onConfirm?: () => Promise<void> | void
  icon?: React.ReactElement
  buttonProps?: ButtonProps
  buttonComponent?: React.ElementType
  threadFormProps?: ThreadFormProps
  forumCategorys?: CrudItem[]
  forumCategory?: CrudItem
}

const ThreadFormDialog: React.FC<ThreadFormDialogProps> = (props) => {
  const {
    buttonComponent: ButtonComponent,
    icon,
    onConfirm,
    buttonProps: injectedButtonProps,
    threadFormProps,
    forumCategorys,
    forumCategory,
    ...rest
  } = props

  // State
  const [confirmationDialogOpen, setThreadFormDialogOpen] = useState(false)
  const openDialog = () => setThreadFormDialogOpen(true)
  const closeDialog = () => setThreadFormDialogOpen(false)

  const title = 'Ask a Question'

  const buttonProps = {
    onClick: openDialog,
    children: title,
    ...injectedButtonProps,
  }

  return (
    <>
      <Button fullWidth variant="contained" {...buttonProps} />

      {/* Dialog */}
      <Dialog
        title={title}
        open={confirmationDialogOpen}
        onClose={closeDialog}
        fullWidth
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
