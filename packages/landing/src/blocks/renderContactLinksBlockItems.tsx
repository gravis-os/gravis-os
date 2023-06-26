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
      type: 'h5',
      title: 'Reach Us',
      titleProps: { sx: { mt: 8, mb: 2 } },
    },
    ...[
      {
        startIcon: <EmailOutlinedIcon color="action" />,
        overline: 'Submit a general inquiry',
        title: general_email,
        href: `mailto:${general_email}`,
      },
      {
        startIcon: <LocalPhoneOutlinedIcon color="action" />,
        overline: 'General hotline',
        title: general_phone,
        href: `tel:${general_phone?.replaceAll(' ', '')}`,
      },
      {
        startIcon: <WhatsAppIcon style={{ fill: 'green' }} />,
        overline: 'WhatsApp',
        title: general_whatsapp,
        href: `https://wa.me/${general_whatsapp?.replaceAll(' ', '')}`,
        titleProps: { targetBlank: true },
      },
    ]
      .map(({ startIcon, title, titleProps, overline, href }) => {
        return [
          {
            type: 'body1',
            title: overline,
            titleProps: { mt: 2 },
          },
          {
            type: 'link',
            title,
            titleProps: {
              startIcon,
              href,
              underline: 'hover',
              ...titleProps,
            },
          },
        ]
      })
      .flat(),
  ]
}

export default renderContactLinksBlockItems
