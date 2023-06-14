import { getRelationalObjectKey } from '@gravis-os/form'
import isNil from 'lodash/isNil'
import omit from 'lodash/omit'
import startCase from 'lodash/startCase'
import { useRouter } from 'next/router'
import React from 'react'
import split from 'lodash/split'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import getValueWithoutOp from './getValueWithoutOp'

const getChipsFromFilters = ({ filters, setFilters, fieldDefs }) => {
  const router = useRouter()
  const { query: routerQuery } = router

  if (!filters) return []

  const getOrsDisplayLabels = (value) => {
    const filterStrings = split(value, ',')
    return reduce(
      filterStrings,
      (prev, curr) => {
        const items = split(curr, '.')
        return [...prev, { key: items[0], value: items[2] }]
      },
      []
    )
  }

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
        return null

      const nextValue = getValueWithoutOp({ key, value, fieldDefs })

      if (key.endsWith('_id')) {
        const relationalObjectKey = getRelationalObjectKey(key)
        return {
          key,
          label: (
            <>
              <b>{startCase(relationalObjectKey)}</b>:{' '}
              {routerQuery[relationalObjectKey] || nextValue}
            </>
          ),
          onDelete: handleDelete(key),
        }
      }

      if (key === 'or') {
        const orLabels = getOrsDisplayLabels(nextValue)
        return {
          key: map(orLabels, 'key').join('-or-'),
          label: (
            <>
              <b>{map(orLabels, ({ key }) => startCase(key)).join(', ')}</b>:{' '}
              {orLabels[0].value}
            </>
          ),
          onDelete: handleDelete(key),
        }
      }

      return {
        key,
        label: (
          <>
            <b>{startCase(key)}</b>: {nextValue}
          </>
        ),
        onDelete: handleDelete(key),
      }
    })
    .filter(Boolean)
}

export default getChipsFromFilters
