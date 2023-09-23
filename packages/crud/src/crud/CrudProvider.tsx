import React, { useState } from 'react'

import CrudContext from './CrudContext'

export interface CrudProviderProps {
  children?: React.ReactNode
}

/**
 * CrudProvider
 * @param props
 * @constructor
 */
const CrudProvider: React.FC<CrudProviderProps> = (props) => {
  const { children, ...rest } = props

  const [selectedItems, setSelectedItems] = useState([])

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const handleDeleteDialogOpen = () => setDeleteDialogOpen(true)
  const handleDeleteDialogClose = () => setDeleteDialogOpen(false)

  return (
    <CrudContext.Provider
      value={{
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
