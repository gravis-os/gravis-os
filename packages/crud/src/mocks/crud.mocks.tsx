import React from 'react'

import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'

export const MOCK_ITEM = {
  id: 1,
  title: 'Title',
  slug: 'title',
  is_active: true,
}

export const MOCK_MODULE = {
  Icon: BallotOutlinedIcon,
  name: {
    plural: 'Contacts',
    singular: 'Contact',
  },
  route: {
    plural: '/contacts',
  },
  select: {
    detail: '*',
    list: '*',
  },
  sk: 'slug',
  table: {
    name: 'contact',
  },
}

export const MOCK_FORM_SECTIONS = [
  {
    title: 'General',
    fields: [{ key: 'title', name: 'title', required: true, type: 'input' }],
    icon: <BallotOutlinedIcon />,
    key: 'general',
    subtitle: 'Fill up general info',
  },
  {
    title: 'Details',
    fields: [
      { key: 'subtitle', name: 'subtitle', type: 'input' },
      { key: 'description', name: 'description', type: 'html' },
      {
        key: 'is_active',
        label: 'Active',
        name: 'is_active',
        subtitle: 'Manage item active state',
        type: 'switch',
      },
    ],
    icon: <BallotOutlinedIcon />,
    key: 'details',
    subtitle: 'Fill up details',
  },
]

export const MOCK_COLUMN_DEFS = [
  { field: 'title' },
  { field: 'slug' },
  { field: 'is_active' },
]
