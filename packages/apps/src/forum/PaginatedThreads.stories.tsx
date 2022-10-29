import React from 'react'
import { PaginatedQueryViewVariantEnum } from '@gravis-os/query'
import PaginatedThreads from './PaginatedThreads'

export default {
  component: PaginatedThreads,
  args: {
    variant: PaginatedQueryViewVariantEnum.List,
    queryResult: {},
    items: [...new Array(10)].map((_, i) => ({
      id: i,
      title: `Thread ${i}`,
      slug: `thread-${i}`,
      forum_category: { forum: {} },
    })),
    itemProps: {
      threadModule: { getWebHref: () => '' },
      forumCategoryModule: { getWebHref: () => '' },
    },
  },
}

const Template = (args) => <PaginatedThreads {...args} />

export const Basic = Template.bind({})
Basic.args = {}
