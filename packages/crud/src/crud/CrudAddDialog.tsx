import React from 'react'
import { Slide } from '@mui/material'
import { Dialog, DialogProps } from '@gravis-os/ui'
import CrudForm, { CrudFormProps } from './CrudForm'
import { UseAddDialogReturn } from './useAddDialog'

export interface CrudAddDialogProps
  extends UseAddDialogReturn,
    Omit<DialogProps, 'open'> {
  crudFormProps?: CrudFormProps
}

const CrudAddDialog: React.FC<CrudAddDialogProps> = (props) => {
  const {
    addDialogOpen,
    module,
    resetAddDialogOpen,
    addFormSections,
    crudFormProps,
    ...rest
  } = props

  return (
    <Dialog
      open={addDialogOpen}
      onClose={resetAddDialogOpen}
      fullScreen
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' } as DialogProps['TransitionProps']}
      {...rest}
    >
      <CrudForm
        module={module}
        sections={addFormSections}
        {...crudFormProps}
        headerProps={{
          sx: { mt: 2, px: 2 },
          disableBreadcrumbs: true,
          onClose: resetAddDialogOpen,
          borderBottom: true,
          actionButtons: [
            { key: 'cancel', children: 'Cancel', onClick: resetAddDialogOpen },
          ],
          ...crudFormProps?.headerProps,
        }}
        useCrudFormProps={{
          ...crudFormProps?.useCrudFormProps,
          afterSubmit: async (...args) => {
            await crudFormProps?.useCrudFormProps?.afterSubmit?.(...args)
            resetAddDialogOpen()
          },
        }}
      />
    </Dialog>
  )
}

export default CrudAddDialog
