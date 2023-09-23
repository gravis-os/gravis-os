import React from 'react'

import { StorageAvatar } from '@gravis-os/storage'
import { Box, Card, CardProps, Stack, Typography } from '@gravis-os/ui'

import { Contact } from './types'

export enum ContactBioDirectionEnum {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export interface ContactBioProps {
  cardProps?: CardProps
  direction?: ContactBioDirectionEnum
  item: Contact
}

const ContactBio: React.FC<ContactBioProps> = (props) => {
  const {
    cardProps,
    direction = ContactBioDirectionEnum.Vertical,
    item,
  } = props

  if (!item) return null

  const { title, avatar_alt, avatar_src, email, full_name, mobile, role } = item
  const displayTitle = full_name || email || title

  const avatarSize = 80
  const isHorizontal = direction === ContactBioDirectionEnum.Horizontal

  return (
    <Card {...cardProps}>
      <Stack
        direction={isHorizontal ? 'row' : 'column'}
        spacing={1}
        sx={{
          alignItems: 'center',
          justifyContent: isHorizontal ? 'flex-start' : 'center',
        }}
      >
        {/* Image */}
        <StorageAvatar
          alt={avatar_alt || displayTitle}
          size={isHorizontal ? avatarSize / 2 : avatarSize}
          src={avatar_src}
        />

        {/* Text */}
        <Box>
          <Typography variant="h3">{displayTitle}</Typography>
          <Typography color="text.secondary" variant="body1">
            {role?.title}
          </Typography>
        </Box>
      </Stack>
    </Card>
  )
}

export default ContactBio
