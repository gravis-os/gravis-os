import React from 'react'
import { FormSectionProps } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import useAddDialog from './useAddDialog'
import CrudAddDialog from './CrudAddDialog'

export interface RenderModelFieldWithCrudProps {
  children: any // Something's wrong with the React.ReactNode here
  module: CrudModule
  addFormSections: FormSectionProps[]
}

const ModelFieldWithCrud: React.FC<RenderModelFieldWithCrudProps> = (props) => {
  const { children, module, addFormSections } = props
  const useAddDialogProps = useAddDialog({ module, addFormSections })
  const { setAddDialogOpen } = useAddDialogProps

  return (
    <>
      {/* ModelField */}
      {React.cloneElement(children, {
        onCreateClick: () => setAddDialogOpen(true),
      })}

      {/* Add Dialog */}
      <CrudAddDialog {...useAddDialogProps} />
    </>
  )
}

export default ModelFieldWithCrud
