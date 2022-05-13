import React from 'react'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'

export const MOCK_ITEM = {
  id: 1,
  title: 'Title',
  slug: 'title',
  is_active: true,
}

export const MOCK_MODULE = {
  sk: 'slug',
  table: {
    name: 'contact',
  },
  name: {
    singular: 'Contact',
    plural: 'Contacts',
  },
  route: {
    plural: '/contacts',
  },
  select: {
    detail: '*',
    list: '*',
  },
  Icon: BallotOutlinedIcon,
}

export const MOCK_FORM_SECTIONS = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up general info',
    icon: <BallotOutlinedIcon />,
    fields: [{ key: 'title', name: 'title', type: 'input', required: true }],
  },
  {
    key: 'details',
    title: 'Details',
    subtitle: 'Fill up details',
    icon: <BallotOutlinedIcon />,
    fields: [
      { key: 'subtitle', name: 'subtitle', type: 'input' },
      { key: 'description', name: 'description', type: 'html' },
      {
        key: 'is_active',
        name: 'is_active',
        type: 'switch',
        label: 'Active',
        subtitle: 'Manage item active state',
      },
    ],
  },
]

export const MOCK_COLUMN_DEFS = [
  { field: 'title' },
  { field: 'slug' },
  { field: 'is_active' },
]
