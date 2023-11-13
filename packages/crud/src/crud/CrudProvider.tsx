import React, { useState } from 'react'

import CrudContext, { CrudContextInterface } from './CrudContext'

export interface CrudProviderProps {
  children?: React.ReactNode
  crudQueryOptions?: CrudContextInterface['crudQueryOptions']
}

/**
 * CrudProvider
 * @param props
 * @constructor
 */
const CrudProvider: React.FC<CrudProviderProps> = (props) => {
  const { children, crudQueryOptions, ...rest } = props

  const [selectedItems, setSelectedItems] = useState([])

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const handleDeleteDialogOpen = () => setDeleteDialogOpen(true)
  const handleDeleteDialogClose = () => setDeleteDialogOpen(false)

  return (
    <CrudContext.Provider
      value={{
        crudQueryOptions,
        // Delete Dialog
        deleteDialogOpen,
        handleDeleteDialogClose,
        handleDeleteDialogOpen,

        hasMultipleSelectedItems: selectedItems?.length > 1,
        hasSelectedItems: Boolean(selectedItems?.length),
        // Selected Items
        selectedItems,
        setSelectedItems,
      }}
      {...rest}
    >
      {children}
    </CrudContext.Provider>
  )
}

export default CrudProvider
