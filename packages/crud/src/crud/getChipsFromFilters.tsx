'use client'

import React from 'react'

import { getRelationalObjectKey } from '@gravis-os/form'
import isNil from 'lodash/isNil'
import omit from 'lodash/omit'
import startCase from 'lodash/startCase'
import { useSearchParams } from 'next/navigation'

import getValueWithoutOp from './getValueWithoutOp'

const getChipsFromFilters = ({ fieldDefs, filters, setFilters }) => {
  const searchParams = useSearchParams()

  if (!filters) return

  const handleDelete = (chipKeyToDelete: string) => () =>
    setFilters(omit(filters, chipKeyToDelete))

  return Object.entries(filters)
    .map((filter) => {
      const [key, value] = filter

      if (
        isNil(value) ||
        value === '' ||
        (typeof value === 'object' && !Array.isArray(value))
      )
        return

      const nextKey = fieldDefs?.[key]?.filterLabel ?? key
      const nextValue = getValueWithoutOp({ fieldDefs, key, value })

      if (key.endsWith('_id')) {
        const relationalObjectKey = getRelationalObjectKey(key, false)
        return {
          key,
          label: (
            <>
              <b>{startCase(relationalObjectKey)}</b>:{' '}
              {searchParams.get(relationalObjectKey) || nextValue}
            </>
          ),
          onDelete: handleDelete(key),
        }
      }

      return {
        key,
        label: (
          <>
            <b>{startCase(nextKey)}</b>: {nextValue}
          </>
        ),
        onDelete: handleDelete(key),
      }
    })
    .filter(Boolean)
}

export default getChipsFromFilters
