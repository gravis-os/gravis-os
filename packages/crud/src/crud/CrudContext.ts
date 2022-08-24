import { createContext } from 'react'
import { CrudContextInterface as InjectedCrudContextInterface } from '@gravis-os/types'

export interface CrudContextInterface<AppCrudModule = any, AppCrudItem = any>
  extends InjectedCrudContextInterface<AppCrudModule, AppCrudItem> {}

const CrudContext = createContext<CrudContextInterface | null>(null)

export default CrudContext
