import React from 'react'
import { StorageAvatar } from '@gravis-os/storage'
import { Box, Typography, Card, CardProps, Stack } from '@gravis-os/ui'
import { Contact } from './types'

export enum ContactBioDirectionEnum {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export interface ContactBioProps {
  item: Contact
  cardProps?: CardProps
  direction?: ContactBioDirectionEnum
}

const ContactBio: React.FC<ContactBioProps> = (props) => {
  const {
    item,
    cardProps,
    direction = ContactBioDirectionEnum.Vertical,
  } = props

  if (!item) return null

  const { avatar_src, avatar_alt, full_name, title, role, mobile, email } = item
  const displayTitle = full_name || email || title

  const avatarSize = 80
  const isHorizontal = direction === ContactBioDirectionEnum.Horizontal

  return (
    <Card {...cardProps}>
      <Stack
        direction={isHorizontal ? 'row' : 'column'}
        spacing={1}
        sx={{
          justifyContent: isHorizontal ? 'flex-start' : 'center',
          alignItems: 'center',
        }}
      >
        {/* Image */}
        <StorageAvatar
          src={avatar_src}
          alt={avatar_alt || displayTitle}
          size={isHorizontal ? avatarSize / 2 : avatarSize}
        />

        {/* Text */}
        <Box>
          <Typography variant="h3">{displayTitle}</Typography>
          <Typography variant="body1" color="text.secondary">
            {role?.title}
          </Typography>
        </Box>
      </Stack>
    </Card>
  )
}

export default ContactBio
