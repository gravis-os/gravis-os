import React from 'react'
import create from 'zustand'
import { useForm, UseFormReturn } from 'react-hook-form'
import {
  Box,
  BoxProps,
  Slider,
  SliderProps,
  SliderRenderItemProps,
  Typography,
  TypographyProps,
} from '@gravis-os/ui'

// ==============================
// State
// ==============================
export interface TypeformState {
  values: Record<string, unknown>
  add: (newItems: Record<string, unknown>) => void
  reset: () => void
}

export const useTypeformStore = create<TypeformState>((set) => ({
  values: {},
  add: (newValues) =>
    set((state) => ({
      values: {
        ...state.values,
        ...newValues,
      },
    })),
  reset: () => set({ values: {} }),
}))

// ==============================
// UI
// ==============================
export interface TypeformItemRenderProps {
  form: UseFormReturn
  store: TypeformState
  values: TypeformState['values']
  slider: SliderRenderItemProps
}

export interface TypeformItemProps {
  key: string

  icon?: React.ReactNode
  title?: React.ReactNode
  titleProps?: TypographyProps
  subtitle?: React.ReactNode
  subtitleProps?: TypographyProps

  commonProps?: {
    titleProps?: TypographyProps
    subtitleProps?: TypographyProps
  }

  render: (renderProps: TypeformItemRenderProps) => React.ReactNode
  onSubmit?: (
    values: TypeformState['values'],
    renderProps: TypeformItemRenderProps
  ) => Promise<void> | void

  containerSx?: BoxProps['sx']
}

const renderTypeformItem =
  (props: TypeformItemProps) => (sliderProps: SliderRenderItemProps) => {
    const {
      icon,
      title,
      titleProps,
      subtitle,
      subtitleProps,

      render,
      onSubmit: injectedOnSubmit,

      commonProps = {},
      containerSx,
    } = props
    const { next } = sliderProps

    // Form
    const form = useForm()
    const { handleSubmit } = form

    // Store
    const store = useTypeformStore((state) => state)
    const { add, values } = store

    // Render Props
    const renderProps = { values, form, store, slider: sliderProps }

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

    // TODO@Joel: Guard against React.ReactNode. Make a helper for this.
    return (
      <Box sx={{ '&, & > form': { width: '100%' }, ...containerSx }}>
        {/* Icon */}
        {icon && <Box sx={{ mb: 1 }}>{icon}</Box>}

        {/* Title */}
        {title && (
          <Typography
            variant="h3"
            gutterBottom
            {...commonProps.titleProps}
            {...titleProps}
          >
            {title}
          </Typography>
        )}

        {/* Subtitle */}
        {subtitle && (
          <Typography
            variant="body1"
            color="text.secondary"
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
  items: TypeformItemProps[]
  sliderProps?: Omit<SliderProps, 'items'>

  // Container
  sx?: BoxProps['sx']
  height?: string | number
  minHeight?: string | number
  center?: boolean

  // Shared title props
  titleProps?: TypographyProps
  subtitleProps?: TypographyProps
}

/**
 * Typeform is a Slider style component with a built-in wizard state.
 * @param props
 * @constructor
 */
const Typeform: React.FC<TypeformProps> = (props) => {
  const {
    items,
    titleProps,
    subtitleProps,
    center,
    minHeight,
    height,
    sx,
    sliderProps,
  } = props

  const nextItems = items.map((item) =>
    renderTypeformItem({
      ...item,

      // Common Props
      commonProps: {
        titleProps,
        subtitleProps,
      },

      // Container of the box
      containerSx: {
        height,
        minHeight,
        ...(center && {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }),
        ...sx,
      },
    })
  )

  return <Slider items={nextItems} disableDrag {...sliderProps} />
}

export default Typeform
