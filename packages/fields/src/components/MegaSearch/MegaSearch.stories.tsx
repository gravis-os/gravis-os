import React from 'react'

import { Box, Divider } from '@gravis-os/ui'
import CategoryIcon from '@mui/icons-material/Category'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices'
import SearchIcon from '@mui/icons-material/Search'

import type { MegaSearchAutocompleteProps } from './MegaSearchAutocomplete'

import MegaSearch from './MegaSearch'
import MegaSearchTabs from './MegaSearchTabs'

export default {
  component: MegaSearch,
}

const defaultMegaSearchProps = {
  title: 'Foo',
}

const MOCK_DROPDOWNS: MegaSearchAutocompleteProps[] = [
  {
    Icon: CategoryIcon,
    key: 'brand',
    label: 'EV Brands',
    name: 'brand',
    options: [
      { label: 'The Shawshank Redemption', value: 'foo' },
      { label: 'The Godfather', value: 'bar' },
      { label: 'The Godfather: Part II', value: 'baz' },
    ],
    placeholder: 'Browse EV Brands',
  },
  {
    Icon: DirectionsCarIcon,
    key: 'vehicle-type',
    label: 'Vehicle Type',
    name: 'vehicleType',
    options: [
      { label: 'The Shawshank Redemption', value: 'foo' },
      { label: 'The Godfather', value: 'bar' },
      { label: 'The Godfather: Part II', value: 'baz' },
    ],
    placeholder: 'Browse Vehicle Type',
  },
  {
    Icon: ElectricalServicesIcon,
    key: 'ev-type',
    label: 'EV Type',
    name: 'evType',
    options: [
      { label: 'The Shawshank Redemption', value: 'foo' },
      { label: 'The Godfather', value: 'bar' },
      { label: 'The Godfather: Part II', value: 'baz' },
    ],
    placeholder: 'Browse EV Type',
  },
]

const tabs = [
  {
    children: (
      <MegaSearch
        dropdowns={[
          {
            autocompleteProps: { disableClearable: true, freeSolo: true },
            Icon: SearchIcon,
            key: 'search',
            label: 'Agent Search',
            name: 'search',
            options: [
              {
                label: 'The Shawshank Redemption',
                value: 'The Shawshank Redemption',
              },
              { label: 'The Godfather', value: 'The Godfather' },
              {
                label: 'The Godfather: Part II',
                value: 'The Godfather: Part II',
              },
            ],
            placeholder: 'Search by Name',
          },
        ]}
      />
    ),
    label: 'Find By Name',
    value: 'name',
  },
  {
    children: <MegaSearch dropdowns={MOCK_DROPDOWNS} />,
    label: 'Find By Category',
    value: 'category',
  },
  {
    children: <MegaSearch dropdowns={MOCK_DROPDOWNS} />,
    label: 'Find By Type',
    value: 'type',
  },
]

export const Basic = (props) => (
  <Box p={3}>
    <MegaSearch
      {...defaultMegaSearchProps}
      dropdowns={[MOCK_DROPDOWNS[0]]}
      {...props}
    />
    <Divider sx={{ my: 2 }} />
    <MegaSearch
      {...defaultMegaSearchProps}
      dropdowns={MOCK_DROPDOWNS}
      {...props}
    />
    <Divider sx={{ my: 2 }} />
    <MegaSearchTabs tabs={tabs} {...props} />
  </Box>
)
