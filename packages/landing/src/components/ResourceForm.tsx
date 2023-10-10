'use client'

import React, { useState } from 'react'

import { Form, FormSections } from '@gravis-os/form'
import { FormCategoryEnum } from '@gravis-os/types'
import { yupResolver } from '@hookform/resolvers/yup'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { parsePhoneNumber } from 'awesome-phonenumber'
import {
  getCode as getCountryCode,
  getNames as getCountryNames,
} from 'country-list'
import freeEmailDomains from 'free-email-domains'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as yup from 'yup'

import { EnquiryTypeEnum } from '../enquiries/common/constants'
import { postEnquiry } from '../enquiries/common/postEnquiry'

const INDUSTRY_OPTIONS = [
  {
    key: 'Advertising/Media/Publishing',
    label: 'Advertising/Media/Publishing',
    value: 'Advertising/Media/Publishing',
  },
  {
    key: 'Aerospace and Aviation',
    label: 'Aerospace and Aviation',
    value: 'Aerospace and Aviation',
  },
  {
    key: 'Agriculture and Forestry',
    label: 'Agriculture and Forestry',
    value: 'Agriculture and Forestry',
  },
  {
    key: 'Automotive',
    label: 'Automotive',
    value: 'Automotive',
  },
  {
    key: 'Banking/Accounting/Financial',
    label: 'Banking/Accounting/Financial',
    value: 'Banking/Accounting/Financial',
  },
  {
    key: 'Computer and Technology',
    label: 'Computer and Technology',
    value: 'Computer and Technology',
  },
  {
    key: 'Education and Training',
    label: 'Education and Training',
    value: 'Education and Training',
  },
  {
    key: 'Engineering and Construction',
    label: 'Engineering and Construction',
    value: 'Engineering and Construction',
  },
  {
    key: 'Entertainment/Travel/Hospitality',
    label: 'Entertainment/Travel/Hospitality',
    value: 'Entertainment/Travel/Hospitality',
  },
  {
    key: 'Food and Beverage',
    label: 'Food and Beverage',
    value: 'Food and Beverage',
  },
  {
    key: 'Government and Public Administration',
    label: 'Government and Public Administration',
    value: 'Government and Public Administration',
  },
  {
    key: 'Healthcare',
    label: 'Healthcare',
    value: 'Healthcare',
  },
  {
    key: 'Insurance',
    label: 'Insurance',
    value: 'Insurance',
  },
  {
    key: 'Legal Solutions',
    label: 'Legal Solutions',
    value: 'Legal Solutions',
  },
  {
    key: 'Manufacturing',
    label: 'Manufacturing',
    value: 'Manufacturing',
  },
  {
    key: 'Marketing',
    label: 'Marketing',
    value: 'Marketing',
  },
  {
    key: 'Non profit Organizations',
    label: 'Non profit Organizations',
    value: 'Non profit Organizations',
  },
  {
    key: 'Other Industry Not Listed',
    label: 'Other Industry Not Listed',
    value: 'Other Industry Not Listed',
  },
  {
    key: 'Pharmaceutical',
    label: 'Pharmaceutical',
    value: 'Pharmaceutical',
  },
  {
    key: 'Public Relations',
    label: 'Public Relations',
    value: 'Public Relations',
  },
  {
    key: 'Real Estate',
    label: 'Real Estate',
    value: 'Real Estate',
  },
  {
    key: 'Retail and Wholesale',
    label: 'Retail and Wholesale',
    value: 'Retail and Wholesale',
  },
  {
    key: 'Scientific',
    label: 'Scientific',
    value: 'Scientific',
  },
  {
    key: 'Telecommunications',
    label: 'Telecommunications',
    value: 'Telecommunications',
  },
  {
    key: 'Transportation and Shipping',
    label: 'Transportation and Shipping',
    value: 'Transportation and Shipping',
  },
  {
    key: 'Utilities',
    label: 'Utilities',
    value: 'Utilities',
  },
]

const SOURCE_OPTIONS = [
  { key: 'email', label: 'Email', value: 'Email' },
  { key: 'google', label: 'Google', value: 'Google' },
  { key: 'linkedin', label: 'LinkedIn', value: 'LinkedIn' },
  {
    key: 'social-media',
    label: 'Social Media',
    value: 'Social Media',
  },
  { key: 'referral', label: 'Referral', value: 'Referral' },
]

export interface ResourceFormProps {
  onSubmit?: (values: any) => void
}

const ResourceForm: React.FC<ResourceFormProps> = (props) => {
  const { onSubmit } = props

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const resourceFormSchema = yup.lazy((values) => {
    const { country, email, mobile } = values

    const { valid: isMobileValid } = parsePhoneNumber(mobile, {
      regionCode: getCountryCode(country),
    })

    const emailDomain = email.split('@')[1]
    const isEmailValid = !freeEmailDomains.includes(emailDomain)
    return yup.object({
      email: yup
        .mixed()
        .test(
          'isValidEmail',
          'Please enter a valid work email.',
          () => isEmailValid
        ),
      mobile: yup
        .mixed()
        .test(
          'isMobileValid',
          'Please select a valid mobile phone number based on the country selected.',
          () => isMobileValid
        ),
    })
  })
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const asPath = `${pathname}?${searchParams}`
  const country = searchParams.get('country')
  const email = searchParams.get('email')
  const industry = searchParams.get('industry')
  const job_department = searchParams.get('job_department')
  const job_role = searchParams.get('job_role')
  const mobile = searchParams.get('mobile')
  const name = searchParams.get('name')
  const source = searchParams.get('source')

  const handleSubmit = async (values) => {
    if (onSubmit) return onSubmit(values)

    setIsLoading(true)

    await postEnquiry({
      origin: window.location.href,
      type: EnquiryTypeEnum.RESOURCE,
      ...values,
    })

    setIsLoading(false)

    const nextPath = asPath.split('?')[0]
    return router.push(`${nextPath}/success`)
  }

  return (
    <div>
      <Form
        defaultValues={{
          country,
          email,
          industry,
          job_department,
          job_role,
          mobile,
          name,
          source:
            SOURCE_OPTIONS.find(
              ({ value }) =>
                value.toLowerCase() === String(source).toLowerCase()
            )?.value || '',
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
                    label: 'Work Email',
                    name: 'email',
                    placeholder: 'What is your work email address?',
                    required: true,
                    type: 'email',
                  },
                  {
                    key: 'country',
                    name: 'country',
                    options: getCountryNames(),
                    placeholder: 'Where are you from?',
                    props: { disableFirstOptionAsDefaultValue: true },
                    required: true,
                  },
                  {
                    key: 'industry',
                    name: 'industry',
                    options: INDUSTRY_OPTIONS,
                    placeholder: 'Which industry are you from?',
                    props: { disableFirstOptionAsDefaultValue: true },
                    required: true,
                  },
                  {
                    key: 'job_department',
                    name: 'job_department',
                    options: [
                      'IT',
                      'HR',
                      'Finance',
                      'Marketing',
                      'Product',
                      'Sales',
                      'Strategy',
                      'Operations',
                      'Others',
                    ],
                    props: { disableFirstOptionAsDefaultValue: true },
                    required: true,
                  },
                  {
                    key: 'job_role',
                    name: 'job_role',
                    options: [
                      {
                        key: 'partner-director-founder',
                        label: 'Partner, Director, or Founder',
                        value: 'Partner, Director, or Founder',
                      },
                      {
                        key: 'cto-cio-it-manager',
                        label: 'CTO, CIO, or IT Manager',
                        value: 'CTO, CIO, or IT Manager',
                      },
                      'Product Manager',
                      'Project Manager',
                      'Business Analyst',
                      'Software Engineer',
                      'Data Scientist',
                      'UI/UX Designer',
                      'Others',
                    ],
                    props: { disableFirstOptionAsDefaultValue: true },
                    required: true,
                  },
                  {
                    key: 'mobile',
                    name: 'mobile',
                    placeholder: 'Phone',
                    required: true,
                    type: 'mobile',
                  },
                  {
                    compact: true,
                    key: 'source',
                    label: 'How did you hear about us?',
                    name: 'source',
                    options: SOURCE_OPTIONS,
                    required: true,
                    type: 'radio',
                  },
                ].map((field) => ({ disabled: isLoading, ...field })),
                key: 'contact',
              },
            ]}
          />
        }
        id={FormCategoryEnum.HONEYPOT}
        onSubmit={handleSubmit}
        resetOnSubmitSuccess
        submitButtonProps={{
          title: 'Download Guide',
          boxProps: { display: 'flex', justifyContent: 'flex-end' },
          fullWidth: true,
          loading: isLoading,
          size: 'large',
          startIcon: <FileDownloadOutlinedIcon />,
          sx: { mt: 1 },
          variant: 'contained',
        }}
        useFormProps={{ resolver: yupResolver(resourceFormSchema) }}
        {...props}
      />
    </div>
  )
}

export default ResourceForm
