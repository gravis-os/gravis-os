import React from 'react'
import {
  Card,
  Stack,
  Box,
  Accordion,
  Typography,
  DescriptionList,
  CardProps,
} from '@gravis-os/ui'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { printAddress } from '@gravis-os/utils'
import { StorageAvatar } from '@gravis-os/storage'
import { Contact } from './types'

export interface ContactCardProps extends CardProps {
  item: Contact
}

const ContactCard: React.FC<ContactCardProps> = (props) => {
  const { item, ...rest } = props

  const { avatar_src, avatar_alt, full_name, title, role, mobile, email } = item

  const displayTitle = full_name || email || title

  return (
    <Card disablePadding {...rest}>
      <Stack spacing={4}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 5,
            px: 3,
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

        <Accordion
          defaultExpandedKeys={['profile']}
          items={[
            {
              key: 'profile',
              title: (
                <Typography
                  variant="subtitle1"
                  startIcon={<InfoOutlinedIcon color="primary" />}
                >
                  Profile
                </Typography>
              ),
              children: (
                <DescriptionList
                  items={[
                    { key: 'name', value: title, label: 'Name' },
                    { key: 'mobile', value: mobile, label: 'Mobile' },
                    { key: 'email', value: email, label: 'Email' },
                    {
                      key: 'company',
                      value: item.company?.title,
                      label: 'Company',
                    },
                    {
                      key: 'address',
                      value: printAddress(item),
                      label: 'Address',
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      </Stack>
    </Card>
  )
}

export default ContactCard
