import CategoryIcon from '@mui/icons-material/Category'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices'
import SearchIcon from '@mui/icons-material/Search'
import { Divider } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import getStorybookTitle from '../../utils/getStorybookTitle'
import MegaSearch from './MegaSearch'
import MegaSearchTabs from './MegaSearchTabs'

export default {
  component: MegaSearch,
  title: getStorybookTitle(MegaSearch.displayName),
}

const defaultMegaSearchProps = {
  title: 'Foo',
}

const MOCK_DROPDOWNS = [
  {
    name: 'brand',
    Icon: CategoryIcon,
    label: 'EV Brands',
    placeholder: 'Browse EV Brands',
    options: [
      { value: 'foo', label: 'The Shawshank Redemption' },
      { value: 'bar', label: 'The Godfather' },
      { value: 'baz', label: 'The Godfather: Part II' },
    ],
  },
  {
    name: 'vehicleType',
    Icon: DirectionsCarIcon,
    label: 'Vehicle Type',
    placeholder: 'Browse Vehicle Type',
    options: [
      { value: 'foo', label: 'The Shawshank Redemption' },
      { value: 'bar', label: 'The Godfather' },
      { value: 'baz', label: 'The Godfather: Part II' },
    ],
  },
  {
    name: 'evType',
    Icon: ElectricalServicesIcon,
    label: 'EV Type',
    placeholder: 'Browse EV Type',
    options: [
      { value: 'foo', label: 'The Shawshank Redemption' },
      { value: 'bar', label: 'The Godfather' },
      { value: 'baz', label: 'The Godfather: Part II' },
    ],
  },
]

const tabs = [
  {
    value: 'name',
    label: 'Find By Name',
    children: (
      <MegaSearch
        dropdowns={[
          {
            name: 'search',
            Icon: SearchIcon,
            label: 'Agent Search',
            placeholder: 'Search by Name',
            AutocompleteProps: { freeSolo: true, disableClearable: true },
            options: [
              {
                value: 'The Shawshank Redemption',
                label: 'The Shawshank Redemption',
              },
              { value: 'The Godfather', label: 'The Godfather' },
              {
                value: 'The Godfather: Part II',
                label: 'The Godfather: Part II',
              },
            ],
          },
        ]}
      />
    ),
  },
  {
    value: 'category',
    label: 'Find By Category',
    children: <MegaSearch dropdowns={MOCK_DROPDOWNS} />,
  },
  {
    value: 'type',
    label: 'Find By Type',
    children: <MegaSearch dropdowns={MOCK_DROPDOWNS} />,
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
