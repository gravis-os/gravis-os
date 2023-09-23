import React from 'react'

import { Typography } from '@gravis-os/ui'

import getStorybookTitle from '../../utils/getStorybookTitle'
import FormSections from '../FormSection/FormSections'
import FormComponent from './Form'

export default {
  title: getStorybookTitle(FormComponent.name),
  args: {
    children: (renderProps) => {
      const { formJsx, submitButtonJsx } = renderProps
      return (
        <div>
          {formJsx}
          {submitButtonJsx}
        </div>
      )
    },
    formJsx: (
      <FormSections
        disableCard
        sections={[
          {
            title: 'General',
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
            key: 'general',
            subtitle: 'Fill in general details',
          },
        ]}
      />
    ),
    onSubmit: (values) =>
      window.alert(`Form submitted: ${JSON.stringify(values, null, 2)}`),
  },
  component: FormComponent,
  decorators: [
    // Layout
    (Story) => (
      <div style={{ margin: '0 auto', width: '50%' }}>
        <Story />
      </div>
    ),
  ],
}

export const Basic = (args) => (
  <>
    <Typography variant="h1">Form</Typography>
    <FormComponent {...args} />
  </>
)
