import React from 'react'

import { ClientTestimonial } from '@gravis-os/types'
import { Ratings } from '@gravis-os/ui'

export interface RenderTestimonialBlockItemProps {
  item: ClientTestimonial
}

const renderTestimonialBlockItem = (props: RenderTestimonialBlockItemProps) => {
  const { item } = props
  const {
    title,
    author_company_title,
    author_job_title,
    author_title,
    rating_count,
  } = item || {}
  return [
    {
      title: `"${title}"`,
      titleProps: { maxWidth: '70%' },
      type: 'subtitle2',
    },
    {
      title: <Ratings disableText sx={{ my: 1 }} value={rating_count} />,
      type: 'jsx',
    },
    { title: author_title, type: 'body1' },
    { title: `${author_job_title}, ${author_company_title}`, type: 'body1' },
  ]
}

export default renderTestimonialBlockItem
