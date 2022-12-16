import React from 'react'
import {
  Accordion,
  Card,
  CardProps,
  DescriptionList,
  Stack,
  Typography,
} from '@gravis-os/ui'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { printAddress } from '@gravis-os/utils'
import { Contact } from './types'
import ContactBio from './ContactBio'

export interface ContactLeafletProps extends CardProps {
  item: Contact
}

const ContactLeaflet: React.FC<ContactLeafletProps> = (props) => {
  const { item, ...rest } = props

  const { title, mobile, email } = item

  return (
    <Card disablePadding {...rest}>
      <Stack spacing={4}>
        <ContactBio item={item} />

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

export default ContactLeaflet
