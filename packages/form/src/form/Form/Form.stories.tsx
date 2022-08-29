import React from 'react'
import { Typography } from '@gravis-os/ui'
import FormComponent from './Form'
import FormSections from '../FormSection/FormSections'

export default {
  component: FormComponent,
  decorators: [
    // Layout
    (Story) => (
      <div style={{ width: '50%', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    formJsx: (
      <FormSections
        disableCard
        sections={[
          {
            key: 'general',
            title: 'General',
            subtitle: 'Fill in general details',
            fields: [
              {
                key: 'avatar_src',
                name: 'avatar_src',
                type: 'image',
              },
              { key: 'title', name: 'title', type: 'input' },
              { key: 'subtitle', name: 'subtitle', type: 'input' },
              { key: 'description', name: 'description', type: 'textarea' },
              { key: 'content', name: 'content', type: 'html' },
              { key: 'is_active', name: 'is_active', type: 'switch' },
            ],
          },
        ]}
      />
    ),
    onSubmit: (values) =>
      window.alert(`Form submitted: ${JSON.stringify(values, null, 2)}`),
    children: (renderProps) => {
      const { formJsx, submitButtonJsx } = renderProps
      return (
        <div>
          {formJsx}
          {submitButtonJsx}
        </div>
      )
    },
  },
}

export const Form = (args) => (
  <>
    <Typography variant="h1">Form</Typography>
    <FormComponent {...args} />
  </>
)
