import { createContext } from 'react'

import { CrudContextInterface as InjectedCrudContextInterface } from '@gravis-os/types'

export interface CrudContextInterface<AppCrudModule = any, AppCrudItem = any>
  extends InjectedCrudContextInterface<AppCrudModule, AppCrudItem> {}

const CrudContext = createContext<CrudContextInterface>({
  crudQueryOptions: {},
  deleteDialogOpen: false,
  handleDeleteDialogClose: () => false,
  handleDeleteDialogOpen: () => false,
  hasMultipleSelectedItems: false,
  hasSelectedItems: false,
  selectedItems: [],
  setSelectedItems: () => false,
})

export default CrudContext
