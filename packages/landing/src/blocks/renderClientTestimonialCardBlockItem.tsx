import React from 'react'

import { ClientTestimonial } from '@gravis-os/types'
import { Ratings } from '@gravis-os/ui'

export interface RenderClientTestimonialCardBlockItemProps {
  item: ClientTestimonial
}

const renderClientTestimonialCardBlockItem = (
  props: RenderClientTestimonialCardBlockItemProps
) => {
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
      type: 'subtitle2',
    },
    {
      title: <Ratings disableText sx={{ my: 2 }} value={rating_count} />,
      type: 'jsx',
    },
    { title: author_title, type: 'body1' },
    { title: `${author_job_title}, ${author_company_title}`, type: 'body1' },
  ]
}

export default renderClientTestimonialCardBlockItem
