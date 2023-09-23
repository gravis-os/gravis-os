import { useState } from 'react'

import { FormSectionProps } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'

export interface UseAddDialogReturn {
  addDialogOpen: boolean
  addFormSections: FormSectionProps[]
  module: CrudModule
  resetAddDialogOpen: () => void
  setAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const useAddDialog = (props): UseAddDialogReturn => {
  const { addFormSections, module } = props

  // States
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const resetAddDialogOpen = () => setAddDialogOpen(false)

  return {
    addDialogOpen,
    addFormSections,
    module,
    resetAddDialogOpen,
    setAddDialogOpen,
  }
}

export default useAddDialog
