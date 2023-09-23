import React from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'

import {
  Box,
  BoxProps,
  Slider,
  SliderProps,
  SliderRenderItemProps,
  Typography,
  TypographyProps,
} from '@gravis-os/ui'
import { create } from 'zustand'

// ==============================
// State
// ==============================
export interface TypeformState {
  add: (newItems: Record<string, unknown>) => void
  reset: () => void
  values: Record<string, unknown>
}

export const useTypeformStore = create<TypeformState>((set) => ({
  add: (newValues) =>
    set((state) => ({
      values: {
        ...state.values,
        ...newValues,
      },
    })),
  reset: () => set({ values: {} }),
  values: {},
}))

// ==============================
// UI
// ==============================
export interface TypeformItemRenderProps {
  form: UseFormReturn
  slider: SliderRenderItemProps
  store: TypeformState
  values: TypeformState['values']
}

export interface TypeformItemProps {
  commonProps?: {
    subtitleProps?: TypographyProps
    titleProps?: TypographyProps
  }

  containerSx?: BoxProps['sx']
  icon?: React.ReactNode
  key: string
  onSubmit?: (
    values: TypeformState['values'],
    renderProps: TypeformItemRenderProps
  ) => Promise<void> | void
  render: (renderProps: TypeformItemRenderProps) => React.ReactNode

  subtitle?: React.ReactNode

  subtitleProps?: TypographyProps
  title?: React.ReactNode

  titleProps?: TypographyProps
}

const renderTypeformItem =
  (props: TypeformItemProps) => (sliderProps: SliderRenderItemProps) => {
    const {
      title,
      commonProps = {},
      containerSx,
      icon,
      onSubmit: injectedOnSubmit,

      render,
      subtitle,

      subtitleProps,
      titleProps,
    } = props
    const { next } = sliderProps

    // Form
    const form = useForm()
    const { handleSubmit } = form

    // Store
    const store = useTypeformStore((state) => state)
    const { add, values } = store

    // Render Props
    const renderProps = { form, slider: sliderProps, store, values }

    // Methods
    const onSubmit = (newValues) => {
      // Add value to store
      add(newValues)

      // Return early if there is a injected onSubmit
      if (injectedOnSubmit) {
        // Return store with new values which would otherwise only be available
        // in the next render cycle.
        const nextValues = { ...values, ...newValues }
        const nextRenderProps = { ...renderProps, values: nextValues }

        return injectedOnSubmit(nextValues, nextRenderProps)
      }

      // Go next by default
      next()
    }

    return (
      <Box sx={{ '&, & > form': { width: '100%' }, ...containerSx }}>
        {/* Icon */}
        {icon && <Box sx={{ mb: 1 }}>{icon}</Box>}

        {/* Title */}
        {title && (
          <Typography
            gutterBottom
            variant="h3"
            {...commonProps.titleProps}
            {...titleProps}
          >
            {title}
          </Typography>
        )}

        {/* Subtitle */}
        {subtitle && (
          <Typography
            color="text.secondary"
            variant="body1"
            {...commonProps.subtitleProps}
            {...subtitleProps}
          >
            {subtitle}
          </Typography>
        )}

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            ...((title || subtitle) && { mt: 3 }),
          }}
        >
          {render(renderProps)}
        </Box>
      </Box>
    )
  }

export interface TypeformProps {
  center?: boolean
  height?: number | string

  items: TypeformItemProps[]
  minHeight?: number | string
  sliderProps?: Omit<SliderProps, 'items'>
  subtitleProps?: TypographyProps

  // Container
  sx?: BoxProps['sx']
  // Shared title props
  titleProps?: TypographyProps
}

/**
 * Typeform is a Slider style component with a built-in wizard state.
 * @param props
 * @constructor
 */
const Typeform: React.FC<TypeformProps> = (props) => {
  const {
    center,
    height,
    items,
    minHeight,
    sliderProps,
    subtitleProps,
    sx,
    titleProps,
  } = props

  const nextItems = items.map((item) =>
    renderTypeformItem({
      ...item,

      // Common Props
      commonProps: {
        subtitleProps,
        titleProps,
      },

      // Container of the box
      containerSx: {
        height,
        minHeight,
        ...(center && {
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }),
        ...sx,
      },
    })
  )

  return <Slider disableDrag items={nextItems} {...sliderProps} />
}

export default Typeform
