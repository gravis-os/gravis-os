import React from 'react'
import pick from 'lodash/pick'
import { useForm } from 'react-hook-form'
import { Stack } from '@gravis-os/ui'
import { Form, FormProps, FormSections } from '@gravis-os/form'

const authFormFields = {
  email: {
    key: 'email',
    name: 'email',
    type: 'input',
    required: true,
  },
  password: {
    key: 'password',
    name: 'password',
    type: 'password',
    required: true,
  },
}

export interface AuthFormProps
  extends Omit<FormProps<any>, 'form' | 'formJsx'> {
  fields?: string[]
}

const AuthForm: React.FC<AuthFormProps> = props => {
  const { fields = ['email', 'password'], ...rest } = props
  const form = useForm()

  return (
    <Form
      form={form}
      formJsx={
        <FormSections
          disableCard
          sections={[
            {
              key: 'account',
              title: 'Account',
              subtitle: 'Enter your credentials',
              fields: Object.values(pick(authFormFields, fields)),
            },
          ]}
        />
      }
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
