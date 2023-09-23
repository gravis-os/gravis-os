import React, { useEffect } from 'react'
import { UseFormReturn, useWatch } from 'react-hook-form'

import { CrudItem } from '@gravis-os/types'
import zipObject from 'lodash/zipObject'

export interface FieldEffectOptions {
  setValue: (
    props: {
      item: CrudItem
      values: Record<string, unknown>
    } & UseFormReturn
  ) => void
  watch: any // UseWatchProps['name']
}

export interface FieldEffectProviderProps {
  children: React.ReactElement
  fieldEffect: FieldEffectOptions
  formContext: UseFormReturn
  item: CrudItem
  name: string
}

/**
 * Ability to set the value of a field by watching on the value of another field.
 * @param props
 * @constructor
 */
const FieldEffectProvider = (props: FieldEffectProviderProps) => {
  const { children, fieldEffect, formContext, item, name } = props
  const { control, setValue } = formContext
  const { setValue: setFieldEffectValue, watch: watchKeys } = fieldEffect

  // Get the current form values in an object shape
  const watchedValues = useWatch({ control, name: watchKeys })
  const watchedObject = zipObject(watchKeys, watchedValues)

  useEffect(() => {
    const nextValue = setFieldEffectValue({
      item,
      values: watchedObject,
      ...formContext,
    })
    setValue(name, nextValue)
  }, [JSON.stringify(watchedObject)])

  return children
}

export default FieldEffectProvider
