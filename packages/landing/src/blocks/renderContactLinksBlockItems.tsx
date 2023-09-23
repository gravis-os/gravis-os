import React from 'react'

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

import { useLayout } from '../providers/LayoutProvider'

export interface RenderContactLinksBlockItemsProps {}

const renderContactLinksBlockItems = () => {
  const { site } = useLayout()
  const { general_email, general_phone, general_whatsapp } = site

  return [
    {
      title: 'Reach Us',
      titleProps: { sx: { mb: 2, mt: 8 } },
      type: 'h5',
    },
    ...[
      {
        title: general_email,
        href: `mailto:${general_email}`,
        overline: 'Submit a general inquiry',
        startIcon: <EmailOutlinedIcon color="action" />,
      },
      {
        title: general_phone,
        href: `tel:${general_phone?.replaceAll(' ', '')}`,
        overline: 'General hotline',
        startIcon: <LocalPhoneOutlinedIcon color="action" />,
      },
      {
        title: general_whatsapp,
        href: `https://wa.me/${general_whatsapp?.replaceAll(' ', '')}`,
        overline: 'WhatsApp',
        startIcon: <WhatsAppIcon style={{ fill: 'green' }} />,
        titleProps: { targetBlank: true },
      },
    ].flatMap(({ title, href, overline, startIcon, titleProps }) => {
      return [
        {
          title: overline,
          titleProps: { mt: 2 },
          type: 'body1',
        },
        {
          title,
          titleProps: {
            href,
            startIcon,
            underline: 'hover',
            ...titleProps,
          },
          type: 'link',
        },
      ]
    }),
  ]
}

export default renderContactLinksBlockItems
