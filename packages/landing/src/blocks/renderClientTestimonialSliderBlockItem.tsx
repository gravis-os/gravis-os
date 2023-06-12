import React from 'react'
import { Ratings } from '@gravis-os/ui'
import { ClientTestimonial } from '@gravis-os/types'

export interface RenderClientTestimonialSliderBlockItemProps {
  item: ClientTestimonial
}

const renderClientTestimonialSliderBlockItem = (
  props: RenderClientTestimonialSliderBlockItemProps
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
      type: 'jsx',
      title: (
        <Ratings
          value={rating_count}
          disableText
          sx={{ justifyContent: 'center', mb: 2 }}
        />
      ),
    },
    {
      type: 'subtitle2',
      title: `"${title}"`,
      titleProps: { sx: { mb: 4 } },
    },
    {
      type: 'body1',
      title: author_title,
      titleProps: { sx: { fontWeight: 'bold' } },
    },
    {
      type: 'body1',
      title: `${author_job_title}, ${author_company_title}`,
      titleProps: { sx: { opacity: 0.5 } },
    },
  ]
}

export default renderClientTestimonialSliderBlockItem
