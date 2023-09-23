import React from 'react'

import { PaginatedQueryViewVariantEnum } from '@gravis-os/query'

import PaginatedThreads from './PaginatedThreads'

export default {
  args: {
    itemProps: {
      forumCategoryModule: { getWebHref: () => '' },
      threadModule: { getWebHref: () => '' },
    },
    items: Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      title: `Thread ${i}`,
      slug: `thread-${i}`,
      forum_category: { forum: {} },
    })),
    queryResult: {},
    variant: PaginatedQueryViewVariantEnum.List,
  },
  component: PaginatedThreads,
}

const Template = (args) => <PaginatedThreads {...args} />

export const Basic = Template.bind({})
Basic.args = {}
