import { FormSectionFieldProps } from '@gravis-os/form'
import get from 'lodash/get'

const getValueWithoutOp = ({
  key,
  value,
  fieldDefs,
}: {
  key: string
  value: unknown
  fieldDefs: Record<string, FormSectionFieldProps>
}) => {
  // Remove operator from display value if operator exists
  const op = get(fieldDefs, key)?.op
  const hasOp = Boolean(op)
  const nextValue = hasOp ? String(value).replace(`${op}.`, '') : value

  return nextValue
}

export default getValueWithoutOp
