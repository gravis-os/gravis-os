import React from 'react'
import create from 'zustand'
import { useForm, UseFormReturn } from 'react-hook-form'
import { Slider, SliderProps, SliderRenderItemProps } from '@gravis-os/ui'

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
  render: (renderProps: TypeformItemRenderProps) => React.ReactNode
  onSubmit?: (
    values: TypeformState['values'],
    renderProps: TypeformItemRenderProps
  ) => Promise<void> | void
}

const renderTypeformItem =
  (props: TypeformItemProps) => (sliderProps: SliderRenderItemProps) => {
    const { render, onSubmit: injectedOnSubmit } = props
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

    return <form onSubmit={handleSubmit(onSubmit)}>{render(renderProps)}</form>
  }

export interface TypeformProps {
  items: TypeformItemProps[]
  sliderProps?: Omit<SliderProps, 'items'>
}

/**
 * Typeform is a Slider style component with a built-in wizard state.
 * @param props
 * @constructor
 */
const Typeform: React.FC<TypeformProps> = (props) => {
  const { items, sliderProps } = props

  const nextItems = items.map((item) => renderTypeformItem(item))

  return (
    <Slider
      items={nextItems}
      autoHeight
      disableCenter
      disableDrag
      {...sliderProps}
    />
  )
}

export default Typeform
