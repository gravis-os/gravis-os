import React from 'react'

import { FormSectionProps, ModelFieldProps } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'

import CrudAddDialog, { CrudAddDialogProps } from './CrudAddDialog'
import useAddDialog from './useAddDialog'

export interface RenderModelFieldWithCrudProps {
  addFormSections: FormSectionProps[]
  children: any // Something's wrong with the React.ReactNode here
  crudAddDialogProps?: CrudAddDialogProps
  modelFieldProps?: ModelFieldProps
  module: CrudModule
}

const ModelFieldWithCrud: React.FC<RenderModelFieldWithCrudProps> = (props) => {
  const {
    addFormSections,
    children,
    crudAddDialogProps,
    modelFieldProps,
    module,
  } = props
  const useAddDialogProps = useAddDialog({
    addFormSections,
    module,
  })
  const { setAddDialogOpen } = useAddDialogProps

  return (
    <>
      {/* ModelField */}
      {React.cloneElement(children, {
        ...modelFieldProps,
        onCreateClick: () => setAddDialogOpen(true),
      })}

      {/* Add Dialog */}
      <CrudAddDialog {...crudAddDialogProps} {...useAddDialogProps} />
    </>
  )
}

export default ModelFieldWithCrud
