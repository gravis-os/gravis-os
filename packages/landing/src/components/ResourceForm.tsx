import React, { useState } from 'react'
import { Form, FormSections } from '@gravis-os/form'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { useRouter } from 'next/router'
import { FormCategoryEnum } from '@gravis-os/types'
import {
  getNames as getCountryNames,
  getCode as getCountryCode,
} from 'country-list'
import * as yup from 'yup'
import { parsePhoneNumber } from 'awesome-phonenumber'
import freeEmailDomains from 'free-email-domains'
import { yupResolver } from '@hookform/resolvers/yup'
import { postEnquiry } from '../enquiries/common/postEnquiry'
import { EnquiryTypeEnum } from '../enquiries/common/constants'

const INDUSTRY_OPTIONS = [
  {
    key: 'Advertising/Media/Publishing',
    value: 'Advertising/Media/Publishing',
    label: 'Advertising/Media/Publishing',
  },
  {
    key: 'Aerospace and Aviation',
    value: 'Aerospace and Aviation',
    label: 'Aerospace and Aviation',
  },
  {
    key: 'Agriculture and Forestry',
    value: 'Agriculture and Forestry',
    label: 'Agriculture and Forestry',
  },
  {
    key: 'Automotive',
    value: 'Automotive',
    label: 'Automotive',
  },
  {
    key: 'Banking/Accounting/Financial',
    value: 'Banking/Accounting/Financial',
    label: 'Banking/Accounting/Financial',
  },
  {
    key: 'Computer and Technology',
    value: 'Computer and Technology',
    label: 'Computer and Technology',
  },
  {
    key: 'Education and Training',
    value: 'Education and Training',
    label: 'Education and Training',
  },
  {
    key: 'Engineering and Construction',
    value: 'Engineering and Construction',
    label: 'Engineering and Construction',
  },
  {
    key: 'Entertainment/Travel/Hospitality',
    value: 'Entertainment/Travel/Hospitality',
    label: 'Entertainment/Travel/Hospitality',
  },
  {
    key: 'Food and Beverage',
    value: 'Food and Beverage',
    label: 'Food and Beverage',
  },
  {
    key: 'Government and Public Administration',
    value: 'Government and Public Administration',
    label: 'Government and Public Administration',
  },
  {
    key: 'Healthcare',
    value: 'Healthcare',
    label: 'Healthcare',
  },
  {
    key: 'Insurance',
    value: 'Insurance',
    label: 'Insurance',
  },
  {
    key: 'Legal Solutions',
    value: 'Legal Solutions',
    label: 'Legal Solutions',
  },
  {
    key: 'Manufacturing',
    value: 'Manufacturing',
    label: 'Manufacturing',
  },
  {
    key: 'Marketing',
    value: 'Marketing',
    label: 'Marketing',
  },
  {
    key: 'Non profit Organizations',
    value: 'Non profit Organizations',
    label: 'Non profit Organizations',
  },
  {
    key: 'Other Industry Not Listed',
    value: 'Other Industry Not Listed',
    label: 'Other Industry Not Listed',
  },
  {
    key: 'Pharmaceutical',
    value: 'Pharmaceutical',
    label: 'Pharmaceutical',
  },
  {
    key: 'Public Relations',
    value: 'Public Relations',
    label: 'Public Relations',
  },
  {
    key: 'Real Estate',
    value: 'Real Estate',
    label: 'Real Estate',
  },
  {
    key: 'Retail and Wholesale',
    value: 'Retail and Wholesale',
    label: 'Retail and Wholesale',
  },
  {
    key: 'Scientific',
    value: 'Scientific',
    label: 'Scientific',
  },
  {
    key: 'Telecommunications',
    value: 'Telecommunications',
    label: 'Telecommunications',
  },
  {
    key: 'Transportation and Shipping',
    value: 'Transportation and Shipping',
    label: 'Transportation and Shipping',
  },
  {
    key: 'Utilities',
    value: 'Utilities',
    label: 'Utilities',
  },
]

const SOURCE_OPTIONS = [
  { key: 'email', value: 'Email', label: 'Email' },
  { key: 'google', value: 'Google', label: 'Google' },
  { key: 'linkedin', value: 'LinkedIn', label: 'LinkedIn' },
  {
    key: 'social-media',
    value: 'Social Media',
    label: 'Social Media',
  },
  { key: 'referral', value: 'Referral', label: 'Referral' },
]

export interface ResourceFormProps {
  onSubmit?: (values: any) => void
}

const ResourceForm: React.FC<ResourceFormProps> = (props) => {
  const { onSubmit } = props

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const resourceFormSchema = yup.lazy((values) => {
    const { mobile, email, country } = values

    const { valid: isMobileValid } = parsePhoneNumber(mobile, {
      regionCode: getCountryCode(country),
    })

    const emailDomain = email.split('@')[1]
    const isEmailValid = !freeEmailDomains.includes(emailDomain)
    return yup.object({
      mobile: yup
        .mixed()
        .test(
          'isMobileValid',
          'Please select a valid mobile phone number based on the country selected.',
          () => isMobileValid
        ),
      email: yup
        .mixed()
        .test(
          'isValidEmail',
          'Please enter a valid work email.',
          () => isEmailValid
        ),
    })
  })
  const { query } = router
  const {
    email = '',
    name = '',
    industry = '',
    country = '',
    mobile = '',
    source = '',
  } = query

  const handleSubmit = async (values) => {
    if (onSubmit) return onSubmit(values)

    setIsLoading(true)

    await postEnquiry({
      type: EnquiryTypeEnum.RESOURCE,
      origin: window.location.href,
      ...values,
    })

    setIsLoading(false)

    const nextPath = router.asPath.split('?')[0]
    return router.push(`${nextPath}/success`)
  }

  return (
    <div>
      <Form
        id={FormCategoryEnum.HONEYPOT}
        resetOnSubmitSuccess
        defaultValues={{
          name,
          email,
          job_role: '',
          job_department: '',
          company_size: '',
          mobile,
          industry,
          country,
          source:
            SOURCE_OPTIONS.find(
              ({ value }) =>
                value.toLowerCase() === String(source).toLowerCase()
            )?.value || '',
        }}
        onSubmit={handleSubmit}
        submitButtonProps={{
          title: 'Download Guide',
          variant: 'contained',
          size: 'large',
          sx: { mt: 1 },
          fullWidth: true,
          startIcon: <FileDownloadOutlinedIcon />,
          boxProps: { display: 'flex', justifyContent: 'flex-end' },
          loading: isLoading,
        }}
        useFormProps={{ resolver: yupResolver(resourceFormSchema) }}
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
                    label: 'Work Email',
                    placeholder: 'What is your work email address?',
                    required: true,
                  },
                  {
                    key: 'job_department',
                    name: 'job_department',
                    required: true,
                    props: { disableFirstOptionAsDefaultValue: true },
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
                  },
                  {
                    key: 'job_role',
                    name: 'job_role',
                    required: true,
                    props: { disableFirstOptionAsDefaultValue: true },
                    options: [
                      {
                        key: 'partner-director-founder',
                        value: 'Partner, Director, or Founder',
                        label: 'Partner, Director, or Founder',
                      },
                      {
                        key: 'cto-cio-it-manager',
                        value: 'CTO, CIO, or IT Manager',
                        label: 'CTO, CIO, or IT Manager',
                      },
                      'Product Manager',
                      'Project Manager',
                      'Business Analyst',
                      'Software Engineer',
                      'Data Scientist',
                      'UI/UX Designer',
                      'Others',
                    ],
                  },
                  {
                    key: 'company_size',
                    name: 'company_size',
                    required: true,
                    props: { disableFirstOptionAsDefaultValue: true },
                    options: [
                      { key: '1-10', value: '1-10', label: '1-10' },
                      { key: '11-50', value: '11-50', label: '11-50' },
                      { key: '51-200', value: '51-200', label: '51-200' },
                      { key: '201-500', value: '201-500', label: '201-500' },
                      { key: '501+', value: '501+', label: '501+' },
                    ],
                  },
                  {
                    key: 'mobile',
                    name: 'mobile',
                    required: true,
                    placeholder: 'Phone',
                    type: 'mobile',
                  },
                  {
                    key: 'industry',
                    name: 'industry',
                    required: true,
                    placeholder: 'Which industry are you from?',
                    props: { disableFirstOptionAsDefaultValue: true },
                    options: INDUSTRY_OPTIONS,
                  },
                  {
                    key: 'country',
                    name: 'country',
                    required: true,
                    placeholder: 'Where are you from?',
                    props: { disableFirstOptionAsDefaultValue: true },
                    options: getCountryNames(),
                  },
                  {
                    key: 'source',
                    name: 'source',
                    label: 'How did you hear about us?',
                    type: 'radio',
                    required: true,
                    compact: true,
                    options: SOURCE_OPTIONS,
                  },
                ].map((field) => ({ disabled: isLoading, ...field })),
              },
            ]}
          />
        }
        {...props}
      />
    </div>
  )
}

export default ResourceForm
