import React from 'react'

import { Dialog, DialogProps } from '@gravis-os/ui'
import { Slide } from '@mui/material'

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
    addFormSections,
    crudFormProps,
    module,
    resetAddDialogOpen,
    ...rest
  } = props

  return (
    <Dialog
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' } as DialogProps['TransitionProps']}
      fullScreen
      onClose={resetAddDialogOpen}
      open={addDialogOpen}
      {...rest}
    >
      <CrudForm
        module={module}
        sections={addFormSections}
        {...crudFormProps}
        headerProps={{
          actionButtons: [
            { children: 'Cancel', key: 'cancel', onClick: resetAddDialogOpen },
          ],
          borderBottom: true,
          disableBreadcrumbs: true,
          onClose: resetAddDialogOpen,
          sx: { mt: 2, px: 2 },
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
