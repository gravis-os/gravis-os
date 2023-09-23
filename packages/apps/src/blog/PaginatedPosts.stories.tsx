import React from 'react'

import { PaginatedQueryViewVariantEnum } from '@gravis-os/query'

import getStorybookTitle from '../utils/getStorybookTitle'
import PaginatedPosts from './PaginatedPosts'

export default {
  title: getStorybookTitle(PaginatedPosts.name),
  args: {
    itemProps: {
      blogCategoryModule: { getWebHref: () => '' },
      postModule: { getWebHref: () => '' },
    },
    items: Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      title: `Post ${i}`,
      slug: `post-${i}`,
      blog_category: { blog: {} },
    })),
    queryResult: {},
    variant: PaginatedQueryViewVariantEnum.List,
  },
  component: PaginatedPosts,
}

const Template = (args) => <PaginatedPosts {...args} />

export const Basic = Template.bind({})
