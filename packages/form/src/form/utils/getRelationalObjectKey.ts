import last from 'lodash/last'

// Always returns the singular version of the key
// By default we want to keep the key prefix
// e.g for *LinesFieldArray: lines.[rowIndex].product_id -> lines.[rowIndex].product
// But for searching/filtering: we only want the exact key
// e.g lines.order_form_line.order_form.sales_order.project_id -> product
const getRelationalObjectKey = (
  key: string,
  shouldKeepPrefix: boolean = true
) =>
  shouldKeepPrefix
    ? key.split('_id')[0]
    : `${(last(key.split('.')) as string).split('_id')[0]}`

export default getRelationalObjectKey
