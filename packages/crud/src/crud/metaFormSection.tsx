import React from 'react'

import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined'

/**
 * metaFormSection
 * Form Section to be used in CrudForm for standard metadata
 */
const metaFormSection = {
  title: 'Meta',
  collapsible: true,
  defaultCollapsed: true,
  fields: [
    { disabled: true, key: 'id', name: 'id', type: 'input' },
    [
      { disabled: true, key: 'created_at', name: 'created_at', type: 'input' },
      { disabled: true, key: 'created_by', name: 'created_by', type: 'input' },
    ],
    [
      { disabled: true, key: 'updated_at', name: 'updated_at', type: 'input' },
      { disabled: true, key: 'updated_by', name: 'updated_by', type: 'input' },
    ],
  ],
  icon: <InventoryOutlinedIcon />,
  key: 'meta',
  subtitle: 'Manage meta',
}

export default metaFormSection
