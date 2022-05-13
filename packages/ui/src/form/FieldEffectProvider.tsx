import React, { useEffect } from 'react'
import zipObject from 'lodash/zipObject'
import { useWatch, FieldPathValues, UseFormReturn } from 'react-hook-form'

export interface FieldEffectProviderProps extends UseFormReturn {
  name: string
  fieldEffect: {
    setValue: (values: Record<string, unknown>) => any
    watch: FieldPathValues<any, any>
  }
  children: React.ReactElement
  item: Record<string, unknown>
}

const FieldEffectProvider = (props: FieldEffectProviderProps) => {
  const { item, name, fieldEffect, children, control, setValue } = props
  const { watch: watchKeys, setValue: valueSetter } = fieldEffect

  const watchedArray = useWatch({ control, name: watchKeys })
  const watchedObject = zipObject(watchKeys, watchedArray)

  useEffect(() => {
    const nextValue = valueSetter({ values: watchedObject, item })
    setValue(name, nextValue)
  }, [watchedObject])

  return children
}

export default FieldEffectProvider
