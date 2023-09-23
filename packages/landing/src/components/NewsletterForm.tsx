import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { Form, FormSections } from '@gravis-os/form'
import { FormCategoryEnum } from '@gravis-os/types'
import { Alert } from '@gravis-os/ui'

import { EnquiryTypeEnum } from '../enquiries/common/constants'
import { postEnquiry } from '../enquiries/common/postEnquiry'

export interface NewsletterFormProps {
  onSubmit?: (values: any) => void
}

const NewsletterForm: React.FC<NewsletterFormProps> = (props) => {
  const { onSubmit } = props

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)

  const handleSubmit = async (values) => {
    if (onSubmit) return onSubmit(values)
    setIsLoading(true)
    await postEnquiry({
      origin: window.location.href,
      type: EnquiryTypeEnum.NEWSLETTER,
      ...values,
    })
    setIsLoading(false)
    setIsSubmitSuccess(true)
    toast.success('Success!')
  }

  return (
    <div>
      {isSubmitSuccess && (
        <Alert onClose={() => setIsSubmitSuccess(false)} sx={{ mb: 2 }}>
          Success!
        </Alert>
      )}

      <Form
        defaultValues={{
          email: '',
        }}
        formJsx={
          <FormSections
            disableCard
            sections={[
              {
                title: 'Contact',
                fields: [
                  {
                    key: 'email',
                    name: 'email',
                    placeholder: 'What is your email address?',
                    required: true,
                    type: 'email',
                  },
                ],
                key: 'contact',
              },
            ]}
          />
        }
        id={FormCategoryEnum.NEWSLETTER}
        onSubmit={handleSubmit}
        resetOnSubmitSuccess
        submitButtonProps={{
          title: 'Get Started',
          boxProps: {
            display: 'flex',
            flex: '1 0 auto',
            justifyContent: 'flex-end',
            ml: 1,
          },
          fullWidthOnMobile: true,
          loading: isLoading,
          size: 'large',
          sx: { px: 3, py: 1.75 },
          variant: 'paper',
        }}
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
        }}
        {...props}
      />
    </div>
  )
}

export default NewsletterForm
