import { getRelationalObjectKey } from '@gravis-os/form'
import isNil from 'lodash/isNil'
import omit from 'lodash/omit'
import startCase from 'lodash/startCase'
import { useRouter } from 'next/router'
import React from 'react'
import getValueWithoutOp from './getValueWithoutOp'

const getChipsFromFilters = ({ filters, setFilters, fieldDefs }) => {
  const router = useRouter()
  const { query: routerQuery } = router

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

      const nextValue = getValueWithoutOp({ key, value, fieldDefs })

      if (key.endsWith('_id')) {
        const relationalObjectKey = getRelationalObjectKey(key, false)
        return {
          key,
          label: (
            <>
              <b>{startCase(relationalObjectKey)}</b>:{' '}
              {routerQuery[relationalObjectKey] || nextValue}
            </>
          ),
          onDelete: handleDelete(key)
        }
      }

      return {
        key,
        label: (
          <>
            <b>{startCase(key)}</b>: {nextValue}
          </>
        ),
        onDelete: handleDelete(key)
      }
    })
    .filter(Boolean)
}

export default getChipsFromFilters
