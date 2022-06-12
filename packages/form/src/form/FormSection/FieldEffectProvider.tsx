import React, { useEffect } from 'react'
import zipObject from 'lodash/zipObject'
import { useWatch, FieldPathValues, UseFormReturn } from 'react-hook-form'

export interface FieldEffectOptions {
  setValue: (values: Record<string, unknown>) => any
  watch: FieldPathValues<any, any>
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
  const { watch: watchKeys, setValue: valueSetter } = fieldEffect

  // Get the current form values in an object shape
  const watchedValues = useWatch({ control, name: watchKeys })
  const watchedObject = zipObject(watchKeys, watchedValues)

  useEffect(() => {
    const nextValue = valueSetter({ values: watchedObject, item })
    setValue(name, nextValue)
  }, [watchedObject])

  return children
}

export default FieldEffectProvider
