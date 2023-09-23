import { useContext } from 'react'

import { UseCrudFormContext } from '../providers/CrudFormProvider'

const useCrudFormContext = () => useContext(UseCrudFormContext)

export default useCrudFormContext
