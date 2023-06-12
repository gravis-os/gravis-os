import React, { useState } from 'react'
import { Form, FormSections } from '@gravis-os/form'
import toast from 'react-hot-toast'
import { Alert } from '@gravis-os/ui'
import { FormCategoryEnum } from '@gravis-os/types'
import { EnquiryTypeEnum, postEnquiry } from '../enquiries'

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
      type: EnquiryTypeEnum.NEWSLETTER,
      origin: window.location.href,
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
        id={FormCategoryEnum.NEWSLETTER}
        resetOnSubmitSuccess
        defaultValues={{
          email: '',
        }}
        onSubmit={handleSubmit}
        submitButtonProps={{
          title: 'Get Started',
          variant: 'paper',
          size: 'large',
          fullWidthOnMobile: true,
          sx: { py: 1.75, px: 3 },
          boxProps: {
            display: 'flex',
            justifyContent: 'flex-end',
            flex: '1 0 auto',
            ml: 1,
          },
          loading: isLoading,
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
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
                    key: 'email',
                    name: 'email',
                    type: 'email',
                    placeholder: 'What is your email address?',
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

export default NewsletterForm
