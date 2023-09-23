import React from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'

import { ControlledTextField } from '@gravis-os/fields'
import { StorageAvatar } from '@gravis-os/storage'
import { RenderPropsFunction } from '@gravis-os/types'
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Card,
  ListItem,
  Stack,
} from '@gravis-os/ui'

export type StatusUpdateFormValuesCard = Record<string, unknown>

export interface StatusUpdateFormPropsCard extends BoxProps {
  defaultValues?: StatusUpdateFormValuesCard
  disableIcon?: boolean
  headerProps?: BoxProps
  onSubmit?: (values: unknown) => void
  person?: {
    avatar_alt?: string
    avatar_src?: string
    subtitle?: string
    title?: string
  }
  renderActions?: RenderPropsFunction<{ form: UseFormReturn }>
  submitButtonProps?: ButtonProps
  submitButtonTitle?: React.ReactNode
}

const StatusUpdateFormCard: React.FC<StatusUpdateFormPropsCard> = (props) => {
  const {
    defaultValues: injectedDefaultValues,
    headerProps,
    onSubmit: injectedOnSubmit,
    person,
    renderActions,
    submitButtonProps,
    submitButtonTitle = 'Post',
    sx,
  } = props

  // Form
  const defaultValues = { ...injectedDefaultValues, content: '' }
  const form = useForm<StatusUpdateFormValuesCard>({ defaultValues })
  const { control, handleSubmit, reset } = form

  // Methods
  const onSubmit = async (values) => {
    await injectedOnSubmit(values)
    reset(defaultValues)
  }

  return (
    <Card sx={sx}>
      {/* Header */}
      <Box
        {...headerProps}
        sx={{
          mb: 1,
          ...headerProps?.sx,
        }}
      >
        {person && (
          <ListItem
            avatar={
              <StorageAvatar
                alt={person.avatar_alt || person.title}
                border
                size={40}
                src={person.avatar_src}
              />
            }
            disableGutters
            disablePadding
            spacing={1}
            subtitle={person.subtitle}
            title={person.title}
            titleProps={{ variant: 'subtitle1' }}
          />
        )}
      </Box>

      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <ControlledTextField
            control={control}
            label="Add Meeting Log"
            minRows={2}
            multiline
            name="content"
            placeholder="Maximum of 2000 characters."
            required
            variant="standard"
          />

          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={1}
          >
            <Stack alignItems="center" direction="row" spacing={1}>
              {renderActions({ form })}
            </Stack>

            {/* Submit Button */}
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="flex-end"
              spacing={1}
              sx={{ flex: 0 }}
            >
              <Button type="submit" variant="contained" {...submitButtonProps}>
                {submitButtonTitle}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Card>
  )
}

export default StatusUpdateFormCard
