import React from 'react'
import { Ratings } from '@gravis-os/ui'
import { ClientTestimonial } from '@gravis-os/types'

export interface RenderTestimonialBlockItemProps {
  item: ClientTestimonial
}

const renderTestimonialBlockItem = (props: RenderTestimonialBlockItemProps) => {
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
      titleProps: { maxWidth: '70%' },
    },
    {
      type: 'jsx',
      title: <Ratings value={rating_count} disableText sx={{ my: 1 }} />,
    },
    { type: 'body1', title: author_title },
    { type: 'body1', title: `${author_job_title}, ${author_company_title}` },
  ]
}

export default renderTestimonialBlockItem
