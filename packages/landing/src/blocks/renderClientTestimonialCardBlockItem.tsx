import React from 'react'
import { Ratings } from '@gravis-os/ui'
import { ClientTestimonial } from '@gravis-os/types'

export interface RenderClientTestimonialCardBlockItemProps {
  item: ClientTestimonial
}

const renderClientTestimonialCardBlockItem = (
  props: RenderClientTestimonialCardBlockItemProps
) => {
  const { item } = props
  const {
    title,
    author_title,
    author_job_title,
    author_company_title,
    rating_count,
  } = item || {}

  return [
    {
      type: 'subtitle2',
      title: `"${title}"`,
    },
    {
      type: 'jsx',
      title: <Ratings value={rating_count} disableText sx={{ my: 2 }} />,
    },
    { type: 'body1', title: author_title },
    { type: 'body1', title: `${author_job_title}, ${author_company_title}` },
  ]
}

export default renderClientTestimonialCardBlockItem
