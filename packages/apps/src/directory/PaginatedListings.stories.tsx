import { PaginatedQueryViewVariantEnum } from '@gravis-os/query'
import React from 'react'
import getStorybookTitle from '../utils/getStorybookTitle'
import PaginatedListings from './PaginatedListings'

export default {
  title: getStorybookTitle(PaginatedListings.name),
  component: PaginatedListings,
  args: {
    variant: PaginatedQueryViewVariantEnum.Grid,
    queryResult: {},
    items: [...new Array(10)].map((_, i) => ({
      id: i,
      title: `Listing ${i}`,
      slug: `listing-${i}`,
      directory_category: { blog: {} },
    })),
    itemProps: {
      listingModule: { getWebHref: () => '' },
      directoryCategoryModule: { getWebHref: () => '' },
      brandModule: { getWebHref: () => '' },
    },
  },
}

const Template = (args) => <PaginatedListings {...args} />

export const Basic = Template.bind({})
Basic.args = {}
