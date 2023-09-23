import React from 'react'

import { PaginatedQueryViewVariantEnum } from '@gravis-os/query'

import getStorybookTitle from '../utils/getStorybookTitle'
import PaginatedListings from './PaginatedListings'

export default {
  title: getStorybookTitle(PaginatedListings.name),
  args: {
    itemProps: {
      brandModule: { getWebHref: () => '' },
      directoryCategoryModule: { getWebHref: () => '' },
      listingModule: { getWebHref: () => '' },
    },
    items: Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      title: `Listing ${i}`,
      slug: `listing-${i}`,
      directory_category: { blog: {} },
    })),
    queryResult: {},
    variant: PaginatedQueryViewVariantEnum.Grid,
  },
  component: PaginatedListings,
}

const Template = (args) => <PaginatedListings {...args} />

export const Basic = Template.bind({})
Basic.args = {}
