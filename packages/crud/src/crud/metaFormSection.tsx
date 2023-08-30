import React from 'react'
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined'

export const metaFormSectionWithFullName = {
  key: 'meta',
  title: 'Meta',
  subtitle: 'Manage meta',
  icon: <InventoryOutlinedIcon />,
  fields: [
    {
      key: 'id',
      name: 'id',
      type: 'input',
      disabled: true,
    },
    [
      {
        key: 'created_at',
        name: 'created_at',
        type: 'input',
        disabled: true,
      },
      {
        key: 'created_by_full_name',
        name: 'created_by_full_name',
        label: 'created_by',
        type: 'input',
        disabled: true,
      },
    ],
    [
      {
        key: 'updated_at',
        name: 'updated_at',
        type: 'input',
        disabled: true,
      },
      {
        key: 'updated_by_full_name',
        name: 'updated_by_full_name',
        label: 'updated_by',
        type: 'input',
        disabled: true,
      },
    ],
  ],
  collapsible: true,
  defaultCollapsed: true,
}

/**
 * metaFormSection
 * Form Section to be used in CrudForm for standard metadata
 */
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
  ],
  collapsible: true,
  defaultCollapsed: true,
}

export default metaFormSection
