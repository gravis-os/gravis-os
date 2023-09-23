import { FormSectionFieldProps } from '@gravis-os/form'
import get from 'lodash/get'

const getValueWithoutOp = ({
  fieldDefs,
  key,
  value,
}: {
  fieldDefs: Record<string, FormSectionFieldProps>
  key: string
  value: unknown
}) => {
  // Remove operator from display value if operator exists
  const op = get(fieldDefs, key)?.op
  const hasOp = Boolean(op)
  const nextValue = hasOp ? String(value).replace(`${op}.`, '') : value

  return nextValue
}

export default getValueWithoutOp
