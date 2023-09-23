import React, { useEffect } from 'react'
import {
  FormProvider,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form'

import { RenderPropsFunction } from '@gravis-os/types'
import { Box, BoxProps, Button, ButtonProps } from '@gravis-os/ui'

import getFormRenderProps, {
  FormRenderPropsInterface,
} from './getFormRenderProps'

export interface FormProps<TFormValues>
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'children' | 'onSubmit'
  > {
  buttonProps?: ButtonProps // Shared button props
  cancelButtonProps?: ButtonProps

  children?: React.ReactNode | RenderPropsFunction<FormRenderPropsInterface>
  defaultValues?: Record<string, any>
  editButtonProps?: ButtonProps

  formContext?: UseFormReturn<TFormValues> // Rhf form object
  formJsx: React.ReactElement // The layout of the form
  formRenderProps?: any
  isReadOnly?: boolean
  onSubmit: SubmitHandler<TFormValues> // Submit action of the form
  resetOnSubmitSuccess?: boolean
  setIsReadOnly?: React.Dispatch<React.SetStateAction<boolean>>
  submitButtonProps?: ButtonProps
  sx?: BoxProps['sx']
  useFormProps?: UseFormProps<any>
}

const Form: React.FC<FormProps<any>> = (props) => {
  const {
    buttonProps,
    children,
    defaultValues: injectedDefaultValues,
    formContext: injectedFormContext,
    formJsx,
    formRenderProps: injectedFormRenderProps,
    onSubmit,
    resetOnSubmitSuccess,
    submitButtonProps,
    sx,
    useFormProps = {},
    ...rest
  } = props

  const defaultForm = useForm(useFormProps)
  const formContext = injectedFormContext || defaultForm
  const { formState, handleSubmit, reset } = formContext
  const defaultValues = injectedDefaultValues || useFormProps?.defaultValues
  const { isSubmitSuccessful, isSubmitting } = formState

  // Reset form values when defaultValues change
  useEffect(() => {
    if (defaultValues) reset(defaultValues)
  }, [defaultValues])

  // Reset form values on submit success
  useEffect(() => {
    if (resetOnSubmitSuccess) reset(defaultValues)
  }, [isSubmitSuccessful])

  const isChildrenRenderProp = typeof children === 'function'
  const renderChildren = (): React.ReactNode => {
    switch (true) {
      case isChildrenRenderProp: {
        const formRenderProps = getFormRenderProps({
          ...props,
          formContext,
          ...injectedFormRenderProps,
        })
        return (children as RenderPropsFunction<FormRenderPropsInterface>)(
          formRenderProps
        )
      }
      case children: {
        return children as React.ReactNode
      }
      default: {
        return formJsx
      }
    }
  }

  return (
    <FormProvider {...formContext}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        {...(rest as any)}
        sx={{ width: '100%', ...sx }}
      >
        {renderChildren()}
        {!isChildrenRenderProp && submitButtonProps && (
          <Button
            disabled={isSubmitting || submitButtonProps?.loading}
            type="submit"
            {...buttonProps}
            {...submitButtonProps}
          />
        )}
      </Box>
    </FormProvider>
  )
}

export default Form
