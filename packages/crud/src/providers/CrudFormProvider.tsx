import React, { createContext } from 'react'
import { UseCrudFormReturn } from '../crud/useCrudForm'

export const UseCrudFormContext = createContext<UseCrudFormReturn>(
  {} as UseCrudFormReturn
)

export interface CrudFormProviderProps extends UseCrudFormReturn {
  children?: React.ReactNode
}

const CrudFormProvider: React.FC<CrudFormProviderProps> = (props) => {
  const { children, ...crudForm } = props
  return (
    <UseCrudFormContext.Provider value={crudForm}>
      {children}
    </UseCrudFormContext.Provider>
  )
}

export default CrudFormProvider
