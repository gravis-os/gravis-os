import React from 'react'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormProps,
  FormSectionFieldProps,
  FormSections,
} from '@gravis-os/form'
import { Stack } from '@gravis-os/ui'
import pick from 'lodash/pick'

const authFormFields = {
  email: {
    key: 'email',
    name: 'email',
    required: true,
    type: 'input',
  },
  password: {
    key: 'password',
    name: 'password',
    required: true,
    type: 'password',
  },
}

export interface AuthFormProps
  extends Omit<FormProps<any>, 'form' | 'formJsx'> {
  fields?: string[]
}

const AuthForm: React.FC<AuthFormProps> = (props) => {
  const { fields = ['email', 'password'], submitButtonProps, ...rest } = props
  const form = useForm()

  return (
    <Form
      formContext={form}
      formJsx={
        <FormSections
          disableCard
          sections={[
            {
              title: 'Account',
              fields: Object.values(
                pick(authFormFields, fields)
              ) as FormSectionFieldProps[],
              key: 'account',
              subtitle: 'Enter your credentials',
            },
          ]}
        />
      }
      submitButtonProps={submitButtonProps}
      {...rest}
    >
      {({ formJsx, submitButtonJsx }) => (
        <Stack spacing={3}>
          {formJsx}
          {submitButtonJsx}
        </Stack>
      )}
    </Form>
  )
}

export default AuthForm
