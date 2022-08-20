import { createContext } from 'react'

export interface CrudContextInterface<AppCrudModule = any, AppCrudItem = any> {
  selectedItems: AppCrudItem[]
  setSelectedItems: React.Dispatch<React.SetStateAction<AppCrudItem[]>>
  hasSelectedItems: boolean
  hasMultipleSelectedItems: boolean

  deleteDialogOpen: boolean
  handleDeleteDialogOpen: () => void
  handleDeleteDialogClose: () => void
}

const CrudContext = createContext<CrudContextInterface | null>(null)

export default CrudContext
