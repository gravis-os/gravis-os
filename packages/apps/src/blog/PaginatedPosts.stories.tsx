import { PaginatedQueryViewVariantEnum } from '@gravis-os/query'
import React from 'react'
import getStorybookTitle from '../utils/getStorybookTitle'
import PaginatedPosts from './PaginatedPosts'

export default {
  title: getStorybookTitle(PaginatedPosts.name),
  component: PaginatedPosts,
  args: {
    variant: PaginatedQueryViewVariantEnum.List,
    queryResult: {},
    items: [...new Array(10)].map((_, i) => ({
      id: i,
      title: `Post ${i}`,
      slug: `post-${i}`,
      blog_category: { blog: {} },
    })),
    itemProps: {
      postModule: { getWebHref: () => '' },
      blogCategoryModule: { getWebHref: () => '' },
    },
  },
}

const Template = (args) => <PaginatedPosts {...args} />

export const Basic = Template.bind({})
