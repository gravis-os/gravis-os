'use client'

import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { Form, FormSections } from '@gravis-os/form'
import { FormCategoryEnum, ServiceCategory } from '@gravis-os/types'
import { Alert } from '@gravis-os/ui'
import { useRouter } from 'next/navigation'

import { EnquiryTypeEnum } from '../enquiries/common/constants'
import { postEnquiry } from '../enquiries/common/postEnquiry'
import { useLayout } from '../providers/LayoutProvider'

export interface LeadFormProps {
  onSubmit?: (values: any) => void
  serviceCategorys?: ServiceCategory[]
}

const LeadForm: React.FC<LeadFormProps> = (props) => {
  const { onSubmit, serviceCategorys } = props

  const { routeConfig, site } = useLayout()
  const { cta_button_title } = site

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (values) => {
    if (onSubmit) return onSubmit(values)
    setIsLoading(true)
    await postEnquiry({
      origin: window.location.href,
      type: EnquiryTypeEnum.LEAD,
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
        <Alert onClose={() => setIsSubmitSuccess(false)} sx={{ my: 2 }}>
          Successfully sent
        </Alert>
      )}

      <Form
        defaultValues={{
          email: '',
          message: '',
          mobile: '',
          name: '',
          needs: [],
          source: '',
        }}
        formJsx={
          <FormSections
            disableCard
            sections={[
              {
                fields: [
                  serviceCategorys && {
                    key: 'needs',
                    label: 'What are you looking for today?',
                    name: 'needs',
                    options: serviceCategorys.map(({ title }) => ({
                      key: title,
                      label: title,
                      value: title,
                    })),
                    required: true,
                    type: 'checkbox',
                  },
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
                  {
                    key: 'source',
                    label: 'How did you hear about us?',
                    name: 'source',
                    options: [
                      {
                        key: 'social-media',
                        label: 'Social Media',
                        value: 'Social Media',
                      },
                      { key: 'google', label: 'Google', value: 'Google' },
                      { key: 'linkedin', label: 'LinkedIn', value: 'LinkedIn' },
                      { key: 'referral', label: 'Referral', value: 'Referral' },
                    ],
                    required: true,
                    type: 'radio',
                  },
                ],
                key: 'contact',
              },
            ]}
          />
        }
        id={FormCategoryEnum.LEAD}
        onSubmit={handleSubmit}
        resetOnSubmitSuccess
        submitButtonProps={{
          title: cta_button_title,
          boxProps: { display: 'flex', justifyContent: 'flex-end' },
          fullWidthOnMobile: true,
          loading: isLoading,
          size: 'large',
          sx: { mt: 2 },
          variant: 'contained',
        }}
        {...props}
      />
    </div>
  )
}

export default LeadForm
