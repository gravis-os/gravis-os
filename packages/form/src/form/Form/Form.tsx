import React, { useEffect } from 'react'
import {
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'
import { Box, BoxProps, Button, ButtonProps } from '@gravis-os/ui'
import { RenderPropsFunction } from '@gravis-os/types'
import getFormRenderProps, {
  FormRenderPropsInterface,
} from './getFormRenderProps'

export interface FormProps<TFormValues>
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onSubmit' | 'children'
  > {
  formJsx: React.ReactElement // The layout of the form
  onSubmit: SubmitHandler<TFormValues> // Submit action of the form

  formContext?: UseFormReturn<TFormValues> // Rhf form object
  useFormProps?: UseFormProps<any>
  children?: React.ReactNode | RenderPropsFunction<FormRenderPropsInterface>

  formRenderProps?: any
  isReadOnly?: boolean
  resetOnSubmitSuccess?: boolean
  defaultValues?: Record<string, any>
  setIsReadOnly?: React.Dispatch<React.SetStateAction<boolean>>
  submitButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  editButtonProps?: ButtonProps
  buttonProps?: ButtonProps // Shared button props
  sx?: BoxProps['sx']
}

const Form: React.FC<FormProps<any>> = (props) => {
  const {
    onSubmit,
    formContext: injectedFormContext,
    useFormProps = {},
    formJsx,
    children,
    formRenderProps: injectedFormRenderProps,
    resetOnSubmitSuccess,
    defaultValues: injectedDefaultValues,
    sx,
    submitButtonProps,
    ...rest
  } = props

  const defaultForm = useForm(useFormProps)
  const formContext = injectedFormContext || defaultForm
  const { watch, handleSubmit, reset, formState } = formContext
  const defaultValues = injectedDefaultValues || useFormProps?.defaultValues
  const { isSubmitSuccessful } = formState

  // Reset form values when defaultValues change
  useEffect(() => {
    if (useFormProps?.defaultValues) reset(useFormProps.defaultValues)
  }, [useFormProps])

  // Reset form values on submit success
  useEffect(() => {
    if (resetOnSubmitSuccess) reset(defaultValues)
  }, [isSubmitSuccessful])

  const isChildrenRenderProp = typeof children === 'function'
  const renderChildren = (): React.ReactNode => {
    switch (true) {
      case isChildrenRenderProp:
        const formRenderProps = getFormRenderProps({
          ...props,
          formContext,
          ...injectedFormRenderProps,
        })
        return (children as RenderPropsFunction<FormRenderPropsInterface>)(
          formRenderProps
        )
      case children:
        return children as React.ReactNode
      default:
        return formJsx
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
        {submitButtonProps && <Button type="submit" {...submitButtonProps} />}
      </Box>
    </FormProvider>
  )
}

export default Form
