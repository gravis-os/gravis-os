import React, { useMemo, useState } from 'react'
import { Form, FormSections } from '@gravis-os/form'
import { Alert } from '@gravis-os/ui'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { FormCategoryEnum } from '@gravis-os/types'
import freeEmailDomains from 'free-email-domains'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { upperCase } from 'lodash'
import { parsePhoneNumber } from 'awesome-phonenumber'
import { postEnquiry } from '../enquiries/common/postEnquiry'
import { EnquiryTypeEnum } from '../enquiries/common/constants'
import { useLayout } from '../providers/LayoutProvider'

export interface ContactFormProps {
  onSubmit?: (values: any) => void
}

const ContactForm: React.FC<ContactFormProps> = (props) => {
  const { onSubmit } = props

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)
  const router = useRouter()
  const { locale } = router
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
                regionCode: upperCase(locale),
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
      type: EnquiryTypeEnum.ENQUIRY,
      origin: window.location.href,
      ...values,
    })
    setIsLoading(false)
    setIsSubmitSuccess(true)
    toast.success('Successfully sent')
    router.push(
      `/${routeConfig?.CONTACT_SUCCESS}?name=${values.name}&email=${values.email}`
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
        id={FormCategoryEnum.CONTACT}
        resetOnSubmitSuccess
        defaultValues={{
          name: '',
          email: '',
          mobile: '',
          message: '',
        }}
        onSubmit={handleSubmit}
        submitButtonProps={{
          title: 'Send Message',
          variant: 'contained',
          size: 'large',
          sx: { mt: 2 },
          fullWidthOnMobile: true,
          boxProps: { display: 'flex', justifyContent: 'flex-end' },
          loading: isLoading,
        }}
        useFormProps={{ resolver: yupResolver(contactFormSchema) }}
        formJsx={
          <FormSections
            disableCard
            sections={[
              {
                key: 'contact',
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
                    type: 'email',
                    placeholder: 'What is your email address?',
                    required: true,
                  },
                  {
                    key: 'mobile',
                    name: 'mobile',
                    type: 'mobile',
                    placeholder: 'What is your mobile number?',
                    required: true,
                  },
                  {
                    key: 'message',
                    name: 'message',
                    type: 'textarea',
                    label: 'Message',
                    placeholder: 'How may we help you?',
                    required: true,
                  },
                ],
              },
            ]}
          />
        }
        {...props}
      />
    </div>
  )
}

export default ContactForm
