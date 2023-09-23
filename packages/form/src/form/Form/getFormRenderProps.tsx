import React from 'react'
import { UseFormReturn } from 'react-hook-form'

import { Button, ButtonProps } from '@gravis-os/ui'
import { Stack } from '@mui/material'

import { FormSectionsProps } from '../FormSection/FormSections'

export interface GetFormRenderPropsInput {
  buttonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  editButtonProps?: ButtonProps
  formContext: UseFormReturn<any>
  formJsx: React.ReactElement
  formRenderProps?: any
  isReadOnly?: boolean
  setIsReadOnly?: React.Dispatch<React.SetStateAction<boolean>>
  submitButtonProps?: ButtonProps
}

export interface FormRenderPropsInterface {
  cancelButtonJsx: React.ReactElement // The cancel button only
  editOrSubmitButtonJsx: React.ReactElement // The edit button only
  formContext: UseFormReturn<any>
  formControlJsx: React.ReactElement // The submit and edit buttons
  formJsx: React.ReactElement // The title and fields
  sections: FormSectionsProps['sections']
  submitButtonJsx: React.ReactElement // The submit button only
}

const getFormRenderProps = (
  props: GetFormRenderPropsInput
): FormRenderPropsInterface => {
  const {
    buttonProps,
    cancelButtonProps: injectedCancelButtonProps,
    editButtonProps: injectedEditButtonProps,
    formContext,
    formJsx,
    formRenderProps,
    isReadOnly,
    setIsReadOnly,
    submitButtonProps: injectedSubmitButtonProps,
  } = props

  const cancelButtonProps = {
    ...buttonProps,
    type: 'button',
    ...injectedCancelButtonProps,
  } as ButtonProps
  const editButtonProps = {
    ...buttonProps,
    title: 'Edit',
    onClick: (e) => {
      e.preventDefault()
      if (setIsReadOnly) setIsReadOnly(!isReadOnly)
    },
    type: 'button',
    ...injectedEditButtonProps,
  } as ButtonProps
  const submitButtonProps = {
    ...buttonProps,
    title: 'Save',
    type: 'submit',
    ...injectedSubmitButtonProps,
  } as ButtonProps

  const {
    formState: { isSubmitting },
  } = formContext

  const submitButtonJsx = (
    <Button
      color="primary"
      disabled={isSubmitting || submitButtonProps?.loading}
      fullWidth
      variant="contained"
      {...submitButtonProps}
    />
  )

  const cancelButtonJsx = !isReadOnly && (
    <Button
      fullWidth
      onClick={() => setIsReadOnly?.(true)}
      title="Cancel"
      variant="muted"
      {...cancelButtonProps}
    />
  )

  const editOrSubmitButtonJsx = (
    <Button
      color="primary"
      fullWidth
      variant={isReadOnly ? 'muted' : 'contained'}
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
    cancelButtonJsx,
    editOrSubmitButtonJsx,
    formContext,
    formControlJsx,
    formJsx,
    submitButtonJsx,
    ...formRenderProps,
  }
}

export default getFormRenderProps
