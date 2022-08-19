import { useContext } from 'react'
import CrudContext, { CrudContextInterface } from './CrudContext'

function useCrud<AppCrudItem>() {
  const context = useContext<CrudContextInterface<AppCrudItem>>(CrudContext)

  if (typeof context === 'undefined') {
    throw new Error('useCrud must be used within an CrudProvider')
  }

  return context
}

export default useCrud
