import React from 'react'

import {
  Accordion,
  Card,
  CardProps,
  DescriptionList,
  Stack,
  Typography,
} from '@gravis-os/ui'
import { printAddress } from '@gravis-os/utils'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import ContactBio from './ContactBio'
import { Contact } from './types'

export interface ContactLeafletProps extends CardProps {
  item: Contact
  showLeadStatus?: boolean
}

const ContactLeaflet: React.FC<ContactLeafletProps> = (props) => {
  const { item, showLeadStatus = false, ...rest } = props

  const { title, company, email, lead_status, mobile } = item || {}

  return (
    <Card disablePadding {...rest}>
      <Stack spacing={4}>
        <ContactBio item={item} />

        <Accordion
          defaultExpandedKeys={['profile']}
          items={[
            {
              title: (
                <Typography
                  startIcon={<InfoOutlinedIcon color="primary" />}
                  variant="subtitle1"
                >
                  Profile
                </Typography>
              ),
              children: (
                <DescriptionList
                  items={[
                    { key: 'name', label: 'Name', value: title },
                    { key: 'mobile', label: 'Mobile', value: mobile },
                    { key: 'email', label: 'Email', value: email },
                    {
                      key: 'company',
                      label: 'Company',
                      value: company?.title,
                    },
                    {
                      key: 'address',
                      label: 'Address',
                      value: printAddress(item),
                    },
                    showLeadStatus && {
                      key: 'lead_status',
                      label: 'Lead Status',
                      value: lead_status,
                    },
                  ]}
                />
              ),
              key: 'profile',
            },
          ]}
        />
      </Stack>
    </Card>
  )
}

export default ContactLeaflet
