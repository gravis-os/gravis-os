import React, { useState } from 'react'
import { Form, FormSections } from '@gravis-os/form'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { useRouter } from 'next/router'
import { FormCategoryEnum } from '@gravis-os/types'
import { getNames, getCode } from 'country-list'
import * as yup from 'yup'
import { parsePhoneNumber } from 'awesome-phonenumber'
import freeEmailDomains from 'free-email-domains'
import { yupResolver } from '@hookform/resolvers/yup'
import { postEnquiry } from '../enquiries/common/postEnquiry'
import { EnquiryTypeEnum } from '../enquiries/common/constants'

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
      regionCode: getCode(country),
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

  const handleSubmit = async (values) => {
    if (onSubmit) return onSubmit(values)
    setIsLoading(true)
    await postEnquiry({
      type: EnquiryTypeEnum.RESOURCE,
      origin: window.location.href,
      ...values,
    })
    setIsLoading(false)
    router.push(`${router.asPath}/success`)
  }

  return (
    <div>
      <Form
        id={FormCategoryEnum.HONEYPOT}
        resetOnSubmitSuccess
        defaultValues={{
          name: '',
          email: '',
          source: '',
          job_role: '',
          job_department: '',
          company_size: '',
          mobile: '',
          industry: '',
          country: '',
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
                    options: [
                      'Advertising/Media/Publishing',
                      'Aerospace and Aviation',
                      'Agriculture and Forestry',
                      'Automotive',
                      'Banking/Accounting/Financial',
                      'Computer and Technology',
                      'Education and Training',
                      'Engineering and Construction',
                      'Entertainment/Travel/Hospitality',
                      'Food and Beverage',
                      'Government and Public Administration',
                      'Healthcare',
                      'Insurance',
                      'Legal Solutions',
                      'Manufacturing',
                      'Marketing',
                      'Non profit Organizations',
                      'Other Industry Not Listed',
                      'Pharmaceutical',
                      'Public Relations',
                      'Real Estate',
                      'Retail and Wholesale',
                      'Scientific',
                      'Telecommunications',
                      'Transportation and Shipping',
                      'Utilities',
                      'VAR/VAD/System Integrator',
                    ],
                  },
                  {
                    key: 'country',
                    name: 'country',
                    required: true,
                    placeholder: 'Where are you from?',
                    props: { disableFirstOptionAsDefaultValue: true },
                    options: getNames(),
                  },
                  {
                    key: 'source',
                    name: 'source',
                    label: 'How did you hear about us?',
                    type: 'radio',
                    required: true,
                    compact: true,
                    options: [
                      {
                        key: 'social-media',
                        value: 'Social Media',
                        label: 'Social Media',
                      },
                      { key: 'google', value: 'Google', label: 'Google' },
                      { key: 'linkedin', value: 'LinkedIn', label: 'LinkedIn' },
                      { key: 'referral', value: 'Referral', label: 'Referral' },
                    ],
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

export default ResourceForm
