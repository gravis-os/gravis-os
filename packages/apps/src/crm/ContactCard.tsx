import React from 'react'

import { CardProps } from '@gravis-os/ui'

import ContactBio, { ContactBioProps } from './ContactBio'
import { Contact } from './types'

export enum ContactCardVariantEnum {
  Centered = 'centered',
}

export interface ContactCardProps extends Omit<CardProps, 'variant'> {
  contactBioProps?: Omit<ContactBioProps, 'item'>
  item: Contact
  variant?: ContactCardVariantEnum
}

const ContactCard: React.FC<ContactCardProps> = (props) => {
  const {
    contactBioProps,
    item,
    variant = ContactCardVariantEnum.Centered,
    ...rest
  } = props

  const { title, email, mobile } = item

  return <ContactBio item={item} {...contactBioProps} />
}

export default ContactCard
