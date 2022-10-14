export type CheckboxTableColumn = string
export type CheckboxTableColumns = CheckboxTableColumn[]

export interface CheckboxTableColumnCell<T> {
  key: string | number
  value: T
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean, value: T) => void
}

export interface CheckboxTableRows<T> {
  [name: string]: CheckboxTableColumnCell<T>[]
}
