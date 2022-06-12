import React from 'react'
import { FormSectionProps } from '@gravis-os/form'
import useAddDialog from './useAddDialog'
import CrudAddDialog from './CrudAddDialog'
import { CrudModule } from '../types'

export interface RenderModelFieldWithCrudProps {
  children: React.ReactElement
  module: CrudModule
  addFormSections: FormSectionProps[]
}

const ModelFieldWithCrud = (props: RenderModelFieldWithCrudProps) => {
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
