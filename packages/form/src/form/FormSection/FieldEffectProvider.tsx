import React, { useEffect } from 'react'
import zipObject from 'lodash/zipObject'
import { UseFormReturn, useWatch } from 'react-hook-form'

export interface FieldEffectOptions {
  setValue: (
    props: {
      item: Record<string, unknown>
      values: Record<string, unknown>
    } & UseFormReturn
  ) => void
  watch: any // UseWatchProps['name']
}

export interface FieldEffectProviderProps {
  name: string
  fieldEffect: FieldEffectOptions
  formContext: UseFormReturn
  children: React.ReactElement
  item: Record<string, unknown>
}

/**
 * Ability to set the value of a field by watching on the value of another field.
 * @param props
 * @constructor
 */
const FieldEffectProvider = (props: FieldEffectProviderProps) => {
  const { item, name, fieldEffect, formContext, children } = props
  const { control, setValue } = formContext
  const { watch: watchKeys, setValue: setFieldEffectValue } = fieldEffect

  // Get the current form values in an object shape
  const watchedValues = useWatch({ control, name: watchKeys })
  const watchedObject = zipObject(watchKeys, watchedValues)

  useEffect(() => {
    const nextValue = setFieldEffectValue({
      values: watchedObject,
      item,
      ...formContext,
    })
    setValue(name, nextValue)
  }, [JSON.stringify(watchedObject)])

  return children
}

export default FieldEffectProvider
