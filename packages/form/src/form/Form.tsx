import React, { useEffect } from 'react'
import {
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'
import { Button, ButtonProps } from '@gravis-os/ui'
import { RenderPropsFunction } from '@gravis-os/types'
import { Stack } from '@mui/material'

export interface FormRenderPropsInterface {
  formJsx: React.ReactElement
  formControlJsx: React.ReactElement
  submitButtonJsx: React.ReactElement
  form: UseFormReturn<any>
}

export interface FormProps<TFormValues>
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onSubmit' | 'children'
  > {
  formJsx: React.ReactElement // The layout of the form
  onSubmit: SubmitHandler<TFormValues> // Submit action of the form

  form?: UseFormReturn<TFormValues> // Rhf form object
  isReadOnly?: boolean
  setIsReadOnly?: React.Dispatch<React.SetStateAction<boolean>>
  useFormProps?: UseFormProps<any>
  submitButtonProps?: ButtonProps
  children?: React.ReactNode | RenderPropsFunction<FormRenderPropsInterface>
}

const Form: React.FC<FormProps<any>> = (props) => {
  const {
    onSubmit,
    form: injectedForm,
    isReadOnly,
    setIsReadOnly,
    useFormProps = {},
    formJsx,
    children,
    submitButtonProps,
    ...rest
  } = props

  const defaultForm = useForm(useFormProps)
  const form = injectedForm || defaultForm
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form
  useEffect(() => {
    if (useFormProps?.defaultValues) reset(useFormProps.defaultValues)
  }, [useFormProps])

  const isChildrenRenderProp = typeof children === 'function'
  const renderChildren = (): React.ReactNode => {
    switch (true) {
      case isChildrenRenderProp:
        const submitButtonChildrenJsx =
          submitButtonProps?.children || submitButtonProps?.title

        const submitButtonJsx = (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={isSubmitting}
            {...submitButtonProps}
          >
            {submitButtonChildrenJsx || 'Save'}
          </Button>
        )
        const formControlJsx = isReadOnly ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsReadOnly(false)}
            fullWidth
            {...submitButtonProps}
          >
            {submitButtonChildrenJsx || 'Edit'}
          </Button>
        ) : (
          <Stack spacing={1}>
            {submitButtonJsx}
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'grey.300',
                color: 'text.primary',
                '&:hover': { backgroundColor: 'grey.400' },
              }}
              onClick={() => setIsReadOnly(true)}
              fullWidth
              {...submitButtonProps}
            >
              {submitButtonChildrenJsx || 'Cancel'}
            </Button>
          </Stack>
        )
        const formRenderProps: FormRenderPropsInterface = {
          formJsx,
          formControlJsx,
          submitButtonJsx,
          form,
        }
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
    <FormProvider {...form}>
      <form
        style={{ width: '100%' }}
        onSubmit={handleSubmit(onSubmit)}
        {...rest}
      >
        {renderChildren()}
      </form>
    </FormProvider>
  )
}

export default Form
