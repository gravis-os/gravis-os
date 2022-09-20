import React from 'react'
import { FormSectionProps, ModelFieldProps } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import useAddDialog from './useAddDialog'
import CrudAddDialog, { CrudAddDialogProps } from './CrudAddDialog'

export interface RenderModelFieldWithCrudProps {
  children: any // Something's wrong with the React.ReactNode here
  crudAddDialogProps?: CrudAddDialogProps
  module: CrudModule
  addFormSections: FormSectionProps[]
  modelFieldProps?: ModelFieldProps
}

const ModelFieldWithCrud: React.FC<RenderModelFieldWithCrudProps> = (props) => {
  const {
    children,
    module,
    addFormSections,
    crudAddDialogProps,
    modelFieldProps,
  } = props
  const useAddDialogProps = useAddDialog({
    module,
    addFormSections,
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
