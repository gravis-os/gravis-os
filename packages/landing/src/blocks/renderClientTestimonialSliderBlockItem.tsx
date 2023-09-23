import React from 'react'

import { ClientTestimonial } from '@gravis-os/types'
import { Ratings } from '@gravis-os/ui'

export interface RenderClientTestimonialSliderBlockItemProps {
  item: ClientTestimonial
}

const renderClientTestimonialSliderBlockItem = (
  props: RenderClientTestimonialSliderBlockItemProps
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
      title: (
        <Ratings
          disableText
          sx={{ justifyContent: 'center', mb: 2 }}
          value={rating_count}
        />
      ),
      type: 'jsx',
    },
    {
      title: `"${title}"`,
      titleProps: { sx: { mb: 4 } },
      type: 'subtitle2',
    },
    {
      title: author_title,
      titleProps: { sx: { fontWeight: 'bold' } },
      type: 'body1',
    },
    {
      title: `${author_job_title}, ${author_company_title}`,
      titleProps: { sx: { opacity: 0.5 } },
      type: 'body1',
    },
  ]
}

export default renderClientTestimonialSliderBlockItem
