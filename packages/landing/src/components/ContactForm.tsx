'use client'

import React, { useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { Form, FormSections } from '@gravis-os/form'
import { FormCategoryEnum } from '@gravis-os/types'
import { Alert } from '@gravis-os/ui'
import { yupResolver } from '@hookform/resolvers/yup'
import { parsePhoneNumber } from 'awesome-phonenumber'
import freeEmailDomains from 'free-email-domains'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'

import { EnquiryTypeEnum } from '../enquiries/common/constants'
import { postEnquiry } from '../enquiries/common/postEnquiry'
import { useLayout } from '../providers/LayoutProvider'

export interface ContactFormProps {
  contactSuccessRoute?: string
  onSubmit?: (values: any) => void
  submitValues?: Record<string, string>
  locale?: string
}

const ContactForm: React.FC<ContactFormProps> = (props) => {
  const { contactSuccessRoute, onSubmit, submitValues, locale = '' } = props
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)
  const router = useRouter()
  const { routeConfig } = useLayout()

  const contactFormSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .mixed()
          .test('isValidEmail', 'Please enter a valid work email.', (value) => {
            const emailDomain = value.split('@')[1]
            return !freeEmailDomains.includes(emailDomain)
          }),
        mobile: yup
          .mixed()
          .test(
            'isMobileValid',
            'Please select a valid mobile phone number based on the country selected.',
            (value) => {
              const parsedMobile = parsePhoneNumber(value, {
                regionCode: locale.toUpperCase(),
              })
              const { valid: isMobileValid } = parsedMobile
              return isMobileValid
            }
          ),
      }),
    [locale]
  )

  const handleSubmit = async (values) => {
    if (onSubmit) return onSubmit(values)
    setIsLoading(true)
    await postEnquiry({
      origin: window.location.href,
      type: EnquiryTypeEnum.ENQUIRY,
      ...submitValues,
      ...values,
    })
    setIsLoading(false)
    setIsSubmitSuccess(true)
    toast.success('Successfully sent')
    if (!contactSuccessRoute && !routeConfig?.CONTACT_SUCCESS) return
    router.push(
      `/${routeConfig?.CONTACT_SUCCESS || contactSuccessRoute}?name=${
        values.name
      }&email=${values.email}`
    )
  }

  return (
    <div>
      {isSubmitSuccess && (
        <Alert onClose={() => setIsSubmitSuccess(false)} sx={{ mb: 2 }}>
          Successfully sent
        </Alert>
      )}

      <Form
        defaultValues={{
          email: '',
          message: '',
          mobile: '',
          name: '',
        }}
        formJsx={
          <FormSections
            disableCard
            sections={[
              {
                title: 'Contact',
                fields: [
                  {
                    key: 'name',
                    name: 'name',
                    placeholder: 'How should we address you?',
                    required: true,
                  },
                  {
                    key: 'email',
                    name: 'email',
                    placeholder: 'What is your email address?',
                    required: true,
                    type: 'email',
                  },
                  {
                    key: 'mobile',
                    name: 'mobile',
                    placeholder: 'What is your mobile number?',
                    required: true,
                    type: 'mobile',
                  },
                  {
                    key: 'message',
                    label: 'Message',
                    name: 'message',
                    placeholder: 'How may we help you?',
                    required: true,
                    type: 'textarea',
                  },
                ],
                key: 'contact',
              },
            ]}
          />
        }
        id={FormCategoryEnum.CONTACT}
        onSubmit={handleSubmit}
        resetOnSubmitSuccess
        submitButtonProps={{
          title: 'Send Message',
          boxProps: { display: 'flex', justifyContent: 'flex-end' },
          fullWidthOnMobile: true,
          loading: isLoading,
          size: 'large',
          sx: { mt: 2 },
          variant: 'contained',
        }}
        useFormProps={{ resolver: yupResolver(contactFormSchema) }}
        {...props}
      />
    </div>
  )
}

export default ContactForm
