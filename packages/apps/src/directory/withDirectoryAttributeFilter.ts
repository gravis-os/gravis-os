/* eslint-disable unicorn/consistent-function-scoping */

import groupBy from 'lodash/groupBy'
import partition from 'lodash/partition'

/**
 * withDirectoryAttributeFilter
 * Transform GET &attr:ABV=eq.Five in queryString to:
 * attribute_value.attribute.title=eq.ABV
 * attribute_value.attribute_option.title=eq.Five
 */
const withDirectoryAttributeFilter = () => (props) => {
  const { filters = [], module, parsedQs } = props
  if (!parsedQs || !Object.keys(parsedQs)?.length) return props

  const attrPrefix = 'attr:'

  // Get keys that start with `attr:`
  const [attrFilters, nonAttrFilters] = partition(filters, (filter) =>
    filter.key.startsWith(attrPrefix)
  )

  const hasAttrFilters = attrFilters.length > 0
  if (!hasAttrFilters) return props

  // Replace the attribute_value with !inner to filter across when attribute is present
  const nextSelect = module.select.list.replace(
    'attribute_value(id, attribute(*), attribute_option(*))',
    'attribute_value!inner(id, attribute!inner(*), attribute_option!inner(*))'
  )

  /**
   * Limitation, only allowed to filter by at least one attribute
   * instead of all that matches.
   *
   * The more filters are applied, the wider the results become.
   *
   * Another limitation is that we are unable to filter by
   * range e.g. price, etc :(
   *
   * Future work should look into using .rpc() to enhance the filters capabilities.
   *
   *  const input = [{ key: 'attr:ABV', op: 'eq', value: 'Five' },
   *  { key: 'attr:ABV', op: 'eq', value: 'Ten' },
   *  { key: 'attr:Size', op: 'eq', value: 'Small' }]
   *
   *  const output = [
   *     {
   *       key: 'attribute_value.attribute.title',
   *       op: 'in',
   *       value: '(ABV, Size)',
   *     },
   *     {
   *       key: 'attribute_value.attribute_option.title',
   *       op: 'in',
   *       value: '(Five, Ten, Small)',
   *     },
   *  ]
   */
  const groupedAttrFilters = groupBy(attrFilters, 'key')
  const nextAttrFiltersObject = Object.entries(groupedAttrFilters).reduce(
    (
      acc,
      [key, values]: [
        key: string,
        value: Array<{ key: string; op: string; value: string }>
      ]
    ) => {
      const attributeTitle = key.split(':')[1]

      return {
        ...acc,
        attributeOptionTitles: [
          ...acc.attributeOptionTitles,
          ...values.map((v) => v.value),
        ],
        attributeTitles: [...acc.attributeTitles, attributeTitle],
      }
    },
    { attributeOptionTitles: [], attributeTitles: [] }
  )

  const nextAttrFilters = nextAttrFiltersObject.attributeTitles?.length
    ? [
        {
          key: 'attribute_value.attribute.title',
          op: 'in',
          value: `(${nextAttrFiltersObject.attributeTitles.join(',')})`,
        },
        {
          key: 'attribute_value.attribute_option.title',
          op: 'in',
          value: `(${nextAttrFiltersObject.attributeOptionTitles.join(',')})`,
        },
      ]
    : []

  const nextFilters = [...nonAttrFilters, ...nextAttrFilters]

  return { filters: nextFilters, props, select: nextSelect }
}

export default withDirectoryAttributeFilter
