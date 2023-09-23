import React from 'react'

import { Job } from '@gravis-os/types'
import { Box, useOpen } from '@gravis-os/ui'
import { printPaddedNumber } from '@gravis-os/utils'

import { useLayout } from '../providers/LayoutProvider'
import Block from '../web/Block/Block'

export interface RenderJobCardBlockItemProps {
  index: number
  job: Job
}

const renderJobCardBlockItem = (props: RenderJobCardBlockItemProps) => {
  const { index, job } = props
  const { title, html, subtitle } = job
  const { routeConfig } = useLayout()

  const [isOpen, { close, open }] = useOpen()

  return {
    boxProps: {
      onClick: open,
      sx: {
        '&:active': {
          backgroundColor: 'action.selected',
        },
        '&:hover': {
          backgroundColor: 'action.hover',
          cursor: 'pointer',
        },
        backgroundColor: 'background.paper',
        p: 3,
      },
    },
    dialogProps: {
      title: 'Careers',
      children: (
        <Box sx={{ p: 2 }}>
          <Block
            items={[
              {
                gridItems: [
                  {
                    md: 8,
                    items: [
                      {
                        title,
                        titleProps: { sx: { mb: 1 } },
                        type: 'h4',
                      },
                      {
                        title: subtitle,
                        type: 'subtitle1',
                      },
                      {
                        title: html,
                        type: 'html',
                      },
                    ],
                  },
                  {
                    md: 4,
                    boxProps: { sx: { position: 'sticky', top: 16 } },
                    items: [
                      {
                        title: subtitle,
                        titleProps: { color: 'text.secondary' },
                        type: 'body1',
                      },
                      {
                        title: 'Apply',
                        titleProps: {
                          color: 'primary',
                          fullWidth: true,
                          href: routeConfig?.CONTACT,
                          hrefProps: { targetBlank: true },
                          size: 'large',
                          sx: { mt: 2 },
                          variant: 'contained',
                        },
                        type: 'button',
                      },
                    ],
                  },
                ],
                gridProps: { spacing: 4 },
                type: 'grid',
              },
            ]}
            py={0}
            reveal={false}
            sx={{ backgroundColor: 'background.paper' }}
          />
        </Box>
      ),
      fullScreenOnMobile: true,
      maxWidth: 'xl',
      onClose: close,
      open: isOpen,
      titleProps: { sx: { pl: { xs: 4, md: 5 } }, variant: 'overline' },
    },
    items: [
      {
        title: printPaddedNumber(index),
        titleProps: { color: 'text.secondary', sx: { mb: 3 } },
        type: 'subtitle2',
      },
      {
        title,
        titleProps: { gutterBottom: true },
        type: 'subtitle2',
      },
      {
        title: subtitle,
        titleProps: { color: 'text.secondary' },
        type: 'body1',
      },
    ],
  }
}

export default renderJobCardBlockItem
