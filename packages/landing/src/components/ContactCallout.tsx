import React from 'react'

import renderContactCalloutButtonBlockItem from '../blocks/renderContactCalloutButtonBlockItem'
import { useLayout } from '../providers/LayoutProvider'
import Block from '../web/Block/Block'

export interface ContactCalloutProps {
  page?: JSX.Element
  size?: 'large' | 'medium'
}

const ContactCallout: React.FC<ContactCalloutProps> = (props) => {
  const { site } = useLayout()
  const { cta_button_title, cta_title } = site || {}
  const { page = <></>, size = 'large' } = props

  const footerCalloutBlockProps = {
    items: [
      {
        gridItems: [
          {
            md: size === 'medium' ? 8 : 12,
            boxProps: {
              sx: {
                alignItems: 'center',
                display: 'flex',
                height: '100%',
                justifyContent:
                  size === 'medium'
                    ? { xs: 'center', md: 'flex-start' }
                    : 'center',
              },
            },
            items: [
              {
                title: cta_title,
                titleProps: {
                  component: 'h5',
                  sx: {
                    textAlign:
                      size === 'medium'
                        ? { xs: 'center', md: 'left' }
                        : 'center',
                  },
                },
                type: size === 'medium' ? 'h5' : 'h4',
              },
            ],
          },
          {
            md: size === 'medium' ? 4 : 12,
            boxProps: {
              sx: {
                textAlign:
                  size === 'medium' ? { xs: 'center', md: 'right' } : 'center',
              },
            },
            items: [
              renderContactCalloutButtonBlockItem({
                title: cta_button_title,
                children: page,
              }),
            ],
          },
        ],
        gridProps: { spacing: size === 'medium' ? { xs: 1, md: 2 } : 3 },
        type: 'grid',
      },
    ],
    py: size === 'medium' ? 3 : 8,
    reveal: false,
    sx: {
      backgroundColor: 'background.paper',
      borderBottom: 1,
      borderBottomColor: 'divider',
      borderColor: 'divider',
      borderTop: 1,
      borderTopColor: 'divider',
    },
  }

  return <Block {...footerCalloutBlockProps} />
}

export default ContactCallout
