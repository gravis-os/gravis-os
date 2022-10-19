import React from 'react'
import BlogListTemplate from './BlogListTemplate'

export default {
  component: BlogListTemplate,
  args: {
    items: [
      {
        id: 1,
        title: 'My First Post',
        slug: 'my-first-post',
        blog_category: { blog: {} },
      },
      {
        id: 2,
        title: 'My Second Post',
        slug: 'my-second-post',
        blog_category: { blog: {} },
      },
    ],
    itemProps: {
      postModule: { getWebHref: () => '' },
      blogCategoryModule: { getWebHref: () => '' },
    },
  },
}

const Template = (args) => <BlogListTemplate {...args} />

export const Basic = Template.bind({})
Basic.args = {}
