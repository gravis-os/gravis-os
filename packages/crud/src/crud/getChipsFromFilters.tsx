import React from 'react'
import { useRouter } from 'next/router'
import isNil from 'lodash/isNil'
import omit from 'lodash/omit'
import startCase from 'lodash/startCase'
import { getRelationalObjectKey } from '@gravis-os/form'

const getChipsFromFilters = ({ filters, setFilters }) => {
  const router = useRouter()
  const { query: routerQuery } = router

  if (!filters) return

  const handleDelete = (chipKeyToDelete: string) => () =>
    setFilters(omit(filters, chipKeyToDelete))

  return Object.entries(filters)
    .map(filter => {
      const [key, value] = filter

      if (
        isNil(value) ||
        value === '' ||
        (typeof value === 'object' && !Array.isArray(value))
      )
        return

      if (key.endsWith('_id')) {
        const relationalObjectKey = getRelationalObjectKey(key)
        return {
          key,
          label: (
            <>
              <b>{startCase(relationalObjectKey)}</b>:{' '}
              {routerQuery[relationalObjectKey] || value}
            </>
          ),
          onDelete: handleDelete(key),
        }
      }

      return {
        key,
        label: (
          <>
            <b>{startCase(key)}</b>: {value}
          </>
        ),
        onDelete: handleDelete(key),
      }
    })
    .filter(Boolean)
}

export default getChipsFromFilters
