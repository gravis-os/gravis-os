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
  const [splitButtonOption, setSplitButtonOption] = useState<string>()

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const handleDeleteDialogOpen = () => setDeleteDialogOpen(true)
  const handleDeleteDialogClose = () => setDeleteDialogOpen(false)

  return (
    <CrudContext.Provider
      value={{
        splitButtonOption,
        setSplitButtonOption,

        // Selected Items
        selectedItems,
        setSelectedItems,
        hasSelectedItems: Boolean(selectedItems?.length),
        hasMultipleSelectedItems: selectedItems?.length > 1,

        // Delete Dialog
        deleteDialogOpen,
        handleDeleteDialogOpen,
        handleDeleteDialogClose,
      }}
      {...rest}
    >
      {children}
    </CrudContext.Provider>
  )
}

export default CrudProvider
