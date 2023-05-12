import React from 'react'
import { Button, ButtonProps } from '@gravis-os/ui'
import { Stack } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'
import { FormSectionsProps } from '../FormSection/FormSections'

export interface GetFormRenderPropsInput {
  formContext: UseFormReturn<any>
  formJsx: React.ReactElement
  buttonProps?: ButtonProps
  submitButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  editButtonProps?: ButtonProps
  isReadOnly?: boolean
  setIsReadOnly?: React.Dispatch<React.SetStateAction<boolean>>
  formRenderProps?: any
}

export interface FormRenderPropsInterface {
  formJsx: React.ReactElement // The title and fields
  formControlJsx: React.ReactElement // The submit and edit buttons
  editOrSubmitButtonJsx: React.ReactElement // The edit button only
  submitButtonJsx: React.ReactElement // The submit button only
  cancelButtonJsx: React.ReactElement // The cancel button only
  formContext: UseFormReturn<any>
  sections: FormSectionsProps['sections']
}

const getFormRenderProps = (
  props: GetFormRenderPropsInput
): FormRenderPropsInterface => {
  const {
    formContext,
    formJsx,
    buttonProps,
    submitButtonProps: injectedSubmitButtonProps,
    cancelButtonProps: injectedCancelButtonProps,
    editButtonProps: injectedEditButtonProps,
    isReadOnly,
    setIsReadOnly,
    formRenderProps,
  } = props

  const cancelButtonProps = {
    ...buttonProps,
    type: 'button',
    ...injectedCancelButtonProps,
  } as ButtonProps
  const editButtonProps = {
    ...buttonProps,
    type: 'button',
    title: 'Edit',
    onClick: (e) => {
      e.preventDefault()
      if (setIsReadOnly) setIsReadOnly(!isReadOnly)
    },
    ...injectedEditButtonProps,
  } as ButtonProps
  const submitButtonProps = {
    ...buttonProps,
    type: 'submit',
    title: 'Save',
    ...injectedSubmitButtonProps,
  } as ButtonProps

  const {
    formState: { isSubmitting },
  } = formContext

  const submitButtonJsx = (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      disabled={isSubmitting}
      {...submitButtonProps}
    />
  )

  const cancelButtonJsx = !isReadOnly && (
    <Button
      variant="muted"
      onClick={() => setIsReadOnly?.(true)}
      fullWidth
      title="Cancel"
      {...cancelButtonProps}
    />
  )

  const editOrSubmitButtonJsx = (
    <Button
      variant={isReadOnly ? 'muted' : 'contained'}
      color="primary"
      fullWidth
      {...(isReadOnly ? editButtonProps : submitButtonProps)}
    />
  )

  const formControlJsx = isReadOnly ? (
    editOrSubmitButtonJsx
  ) : (
    <Stack spacing={1}>
      {submitButtonJsx}
      {cancelButtonJsx}
    </Stack>
  )

  return {
    formJsx,
    formControlJsx,
    editOrSubmitButtonJsx,
    cancelButtonJsx,
    formContext,
    ...formRenderProps,
  }
}

export default getFormRenderProps
