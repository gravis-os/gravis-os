import { createContext } from 'react'
import { CrudContextInterface as InjectedCrudContextInterface } from '@gravis-os/types'

export interface CrudContextInterface<AppCrudModule = any, AppCrudItem = any>
  extends InjectedCrudContextInterface<AppCrudModule, AppCrudItem> {}

const CrudContext = createContext<CrudContextInterface>({
  selectedItems: [],
  setSelectedItems: () => false,
  hasSelectedItems: false,
  hasMultipleSelectedItems: false,
  deleteDialogOpen: false,
  handleDeleteDialogOpen: () => false,
  handleDeleteDialogClose: () => false,
})

export default CrudContext
