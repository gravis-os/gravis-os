import React, { useEffect } from 'react'
import {
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'
import { ButtonProps } from '@gravis-os/ui'
import { RenderPropsFunction } from '@gravis-os/types'
import { Box, SxProps } from '@mui/material'
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
  setIsReadOnly?: React.Dispatch<React.SetStateAction<boolean>>
  submitButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  editButtonProps?: ButtonProps
  buttonProps?: ButtonProps // Shared button props
  sx?: SxProps
}

const Form: React.FC<FormProps<any>> = (props) => {
  const {
    onSubmit,
    formContext: injectedFormContext,
    useFormProps = {},
    formJsx,
    children,
    formRenderProps,
    sx,
    ...rest
  } = props

  const defaultForm = useForm(useFormProps)
  const formContext = injectedFormContext || defaultForm
  const { handleSubmit, reset } = formContext

  useEffect(() => {
    if (useFormProps?.defaultValues) reset(useFormProps.defaultValues)
  }, [useFormProps])

  const isChildrenRenderProp = typeof children === 'function'
  const renderChildren = (): React.ReactNode => {
    switch (true) {
      case isChildrenRenderProp:
        const formRenderProps = getFormRenderProps({ ...props, formContext })
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
        {...rest}
        sx={{ width: '100%', ...sx }}
      >
        {renderChildren()}
      </Box>
    </FormProvider>
  )
}

export default Form
