import { useState } from 'react'

const useAddDialog = (props) => {
  const { module, addFormSections } = props

  // States
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const resetAddDialogOpen = () => setAddDialogOpen(false)

  return {
    module,
    addDialogOpen,
    setAddDialogOpen,
    resetAddDialogOpen,
    addFormSections,
  }
}

export default useAddDialog
