import React from 'react'
import { Card, CardProps, Stack } from '@gravis-os/ui'
import { Contact } from './types'
import ContactBio, { ContactBioProps } from './ContactBio'

export enum ContactCardVariantEnum {
  Centered = 'centered',
}

export interface ContactCardProps extends Omit<CardProps, 'variant'> {
  item: Contact
  variant?: ContactCardVariantEnum
  contactBioProps?: Omit<ContactBioProps, 'item'>
}

const ContactCard: React.FC<ContactCardProps> = (props) => {
  const {
    contactBioProps,
    variant = ContactCardVariantEnum.Centered,
    item,
    ...rest
  } = props

  const { title, mobile, email } = item

  return <ContactBio item={item} {...contactBioProps} />
}

export default ContactCard
