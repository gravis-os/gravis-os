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
  showLeadStatus?: boolean
}

const ContactLeaflet: React.FC<ContactLeafletProps> = (props) => {
  const { item, showLeadStatus = false, ...rest } = props

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
                    showLeadStatus && {
                      key: 'lead_status',
                      value: item?.lead_status,
                      label: 'Lead Status',
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
