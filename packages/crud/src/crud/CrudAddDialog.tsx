import React from 'react'
import { Slide } from '@mui/material'
import { Dialog } from '@gravis-os/ui'
import CrudForm from './CrudForm'

const CrudAddDialog = props => {
  const {
    addDialogOpen,
    module,
    resetAddDialogOpen,
    addFormSections,
    crudFormProps,
  } = props

  return (
    <Dialog
      open={addDialogOpen}
      onClose={resetAddDialogOpen}
      fullScreen
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' } as any}
    >
      <CrudForm
        module={module}
        sections={addFormSections}
        headerProps={{
          sx: { mt: 2, px: 2 },
          disableBreadcrumbs: true,
          onClose: resetAddDialogOpen,
          borderBottom: true,
          actions: [
            { key: 'cancel', children: 'Cancel', onClick: resetAddDialogOpen },
          ],
        }}
        {...crudFormProps}
        useCrudFormProps={{
          afterSubmit: resetAddDialogOpen,
          ...crudFormProps?.useCrudFormProps,
        }}
      />
    </Dialog>
  )
}

export default CrudAddDialog
