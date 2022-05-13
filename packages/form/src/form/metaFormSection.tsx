import React from 'react'
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined'

const metaFormSection = {
  key: 'meta',
  title: 'Meta',
  subtitle: 'Manage meta',
  icon: <InventoryOutlinedIcon />,
  fields: [
    { key: 'id', name: 'id', type: 'input', disabled: true },
    [
      { key: 'created_at', name: 'created_at', type: 'input', disabled: true },
      { key: 'created_by', name: 'created_by', type: 'input', disabled: true },
    ],
    [
      { key: 'updated_at', name: 'updated_at', type: 'input', disabled: true },
      { key: 'updated_by', name: 'updated_by', type: 'input', disabled: true },
    ],
    { key: 'status', name: 'status', type: 'input' },
  ],
}

export default metaFormSection
