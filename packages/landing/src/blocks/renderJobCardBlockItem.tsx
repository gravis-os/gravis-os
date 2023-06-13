import React from 'react'
import { Box, useOpen } from '@gravis-os/ui'
import { printPaddedNumber } from '@gravis-os/utils'
import { Job } from '@gravis-os/types'
import { useLayout } from '../providers/LayoutProvider'
import Block from '../web/Block/Block'

export interface RenderJobCardBlockItemProps {
  index: number
  job: Job
}

const renderJobCardBlockItem = (props: RenderJobCardBlockItemProps) => {
  const { job, index } = props
  const { title, subtitle, html } = job
  const { routeConfig } = useLayout()

  const [isOpen, { open, close }] = useOpen()

  return {
    boxProps: {
      onClick: open,
      sx: {
        backgroundColor: 'background.paper',
        p: 3,
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: 'action.hover',
        },
        '&:active': {
          backgroundColor: 'action.selected',
        },
      },
    },
    dialogProps: {
      open: isOpen,
      onClose: close,
      maxWidth: 'xl',
      fullScreenOnMobile: true,
      title: 'Careers',
      titleProps: { variant: 'overline', sx: { pl: { xs: 4, md: 5 } } },
      children: (
        <Box sx={{ p: 2 }}>
          <Block
            py={0}
            reveal={false}
            sx={{ backgroundColor: 'background.paper' }}
            items={[
              {
                type: 'grid',
                gridProps: { spacing: 4 },
                gridItems: [
                  {
                    md: 8,
                    items: [
                      {
                        type: 'h4',
                        title,
                        titleProps: { sx: { mb: 1 } },
                      },
                      {
                        type: 'subtitle1',
                        title: subtitle,
                      },
                      {
                        type: 'html',
                        title: html,
                      },
                    ],
                  },
                  {
                    md: 4,
                    boxProps: { sx: { position: 'sticky', top: 16 } },
                    items: [
                      {
                        type: 'body1',
                        title: subtitle,
                        titleProps: { color: 'text.secondary' },
                      },
                      {
                        type: 'button',
                        title: 'Apply',
                        titleProps: {
                          href: routeConfig?.CONTACT,
                          hrefProps: { targetBlank: true },
                          variant: 'contained',
                          color: 'primary',
                          fullWidth: true,
                          size: 'large',
                          sx: { mt: 2 },
                        },
                      },
                    ],
                  },
                ],
              },
            ]}
          />
        </Box>
      ),
    },
    items: [
      {
        type: 'subtitle2',
        title: printPaddedNumber(index),
        titleProps: { color: 'text.secondary', sx: { mb: 3 } },
      },
      {
        type: 'subtitle2',
        title,
        titleProps: { gutterBottom: true },
      },
      {
        type: 'body1',
        title: subtitle,
        titleProps: { color: 'text.secondary' },
      },
    ],
  }
}

export default renderJobCardBlockItem
