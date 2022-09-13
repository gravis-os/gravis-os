import { Button } from '@gravis-os/ui'
import { Stack } from '@mui/material'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormSectionsProps } from '../FormSection/FormSections'

export interface FormRenderPropsInterface {
  formJsx: React.ReactElement // The title and fields
  formControlJsx: React.ReactElement // The submit and eidt buttons
  editOrSubmitButtonJsx: React.ReactElement // The edit button only
  submitButtonJsx: React.ReactElement // The submit button only
  cancelButtonJsx: React.ReactElement // The cancel button only
  formContext: UseFormReturn<any>
  sections: FormSectionsProps['sections']
}

const getFormRenderProps = (props) => {
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

  const submitButtonProps = { ...buttonProps, ...injectedSubmitButtonProps }
  const cancelButtonProps = { ...buttonProps, ...injectedCancelButtonProps }
  const editButtonProps = { ...buttonProps, ...injectedEditButtonProps }

  const {
    formState: { isSubmitting },
  } = formContext

  const submitButtonJsx = (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      type="submit"
      disabled={isSubmitting}
      title="Save"
      {...submitButtonProps}
    />
  )

  const cancelButtonJsx = !isReadOnly && (
    <Button
      variant="muted"
      onClick={() => setIsReadOnly(true)}
      fullWidth
      title="Cancel"
      {...cancelButtonProps}
    />
  )

  const editOrSubmitButtonJsx = (
    <Button
      variant={isReadOnly ? 'muted' : 'contained'}
      color="primary"
      onClick={() => setIsReadOnly(!isReadOnly)}
      fullWidth
      title={isReadOnly ? 'Edit' : 'Save'}
      type={isReadOnly ? 'submit' : 'button'}
      {...(isReadOnly ? editButtonProps : submitButtonProps)}
    />
  )

  const formControlJsx = isReadOnly ? (
    editOrSubmitButtonJsx
  ) : (
    <Stack spacing={1}>
      {submitButtonJsx}
      {editOrSubmitButtonJsx}
    </Stack>
  )

  return {
    formJsx,
    formControlJsx,
    editOrSubmitButtonJsx,
    submitButtonJsx,
    cancelButtonJsx,
    formContext,
    ...formRenderProps,
  }
}

export default getFormRenderProps
