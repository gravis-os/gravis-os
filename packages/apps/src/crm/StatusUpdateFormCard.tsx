import React from 'react'
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Card,
  ListItem,
  Stack,
} from '@gravis-os/ui'
import { StorageAvatar } from '@gravis-os/storage'
import { useForm, UseFormReturn } from 'react-hook-form'
import { ControlledTextField } from '@gravis-os/fields'
import { RenderPropsFunction } from '@gravis-os/types'

export type StatusUpdateFormValuesCard = Record<string, unknown>

export interface StatusUpdateFormPropsCard extends BoxProps {
  onSubmit?: (values: unknown) => void
  defaultValues?: StatusUpdateFormValuesCard
  submitButtonProps?: ButtonProps
  headerProps?: BoxProps
  disableIcon?: boolean
  person?: {
    title?: string
    subtitle?: string
    avatar_src?: string
    avatar_alt?: string
  }
  submitButtonTitle?: React.ReactNode
  renderActions?: RenderPropsFunction<{ form: UseFormReturn }>
}

const StatusUpdateFormCard: React.FC<StatusUpdateFormPropsCard> = (props) => {
  const {
    defaultValues: injectedDefaultValues,
    onSubmit: injectedOnSubmit,
    submitButtonProps,
    headerProps,
    sx,
    person,
    submitButtonTitle = 'Post',
    renderActions,
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
            disablePadding
            avatar={
              <StorageAvatar
                src={person.avatar_src}
                alt={person.avatar_alt || person.title}
                size={40}
                border
              />
            }
            title={person.title}
            titleProps={{ variant: 'subtitle1' }}
            subtitle={person.subtitle}
            spacing={1}
            disableGutters
          />
        )}
      </Box>

      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <ControlledTextField
            name="content"
            control={control}
            placeholder="Maximum of 2000 characters."
            label="Add Meeting Log"
            required
            multiline
            minRows={2}
            variant="standard"
          />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              {renderActions({ form })}
            </Stack>

            {/* Submit Button */}
            <Stack
              direction="row"
              alignItems="center"
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
