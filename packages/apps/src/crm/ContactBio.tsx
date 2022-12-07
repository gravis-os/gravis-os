import React from 'react'
import { StorageAvatar } from '@gravis-os/storage'
import { Box, Typography, Card, CardProps } from '@gravis-os/ui'
import { Contact } from './types'

export interface ContactBioProps {
  item: Contact
  cardProps?: CardProps
}

const ContactBio: React.FC<ContactBioProps> = (props) => {
  const { item, cardProps } = props

  if (!item) return null

  const { avatar_src, avatar_alt, full_name, title, role, mobile, email } = item
  const displayTitle = full_name || email || title

  return (
    <Card {...cardProps}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <StorageAvatar
          src={avatar_src}
          alt={avatar_alt || displayTitle}
          size={80}
        />
        <Box sx={{ mt: 1 }}>
          <Typography variant="h3">{displayTitle}</Typography>
          <Typography variant="body1" color="text.secondary">
            {role?.title}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default ContactBio
