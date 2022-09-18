import { useContext } from 'react'
import CrudContext, { CrudContextInterface } from './CrudContext'

function useCrud<AppCrudItem>() {
  const context = useContext<CrudContextInterface<AppCrudItem>>(CrudContext)

  return context
}

export default useCrud
