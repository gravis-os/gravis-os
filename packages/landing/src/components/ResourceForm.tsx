import React, { useState } from 'react'
import { Form, FormSections } from '@gravis-os/form'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { useRouter } from 'next/router'
import { FormCategoryEnum } from '@gravis-os/types'
import { postEnquiry } from '../enquiries/common/postEnquiry'
import { EnquiryTypeEnum } from '../enquiries/common/constants'

export interface ResourceFormProps {
  onSubmit?: (values: any) => void
}

const ResourceForm: React.FC<ResourceFormProps> = (props) => {
  const { onSubmit } = props

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

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
