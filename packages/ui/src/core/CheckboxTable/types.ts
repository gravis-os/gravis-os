export type CheckboxTableColumn = string
export type CheckboxTableColumns = CheckboxTableColumn[]

export interface CheckboxTableColumnDef {
  label: string
  value: string
  width: string | number
}
export type CheckboxTableColumnDefs = CheckboxTableColumnDef[]

export interface CheckboxTableColumnCell<T> {
  key: string
  value: T
  checked: boolean
  onChange: (checked: boolean, value: T) => void
}

export interface CheckboxTableRows<T> {
  [name: string]: CheckboxTableColumnCell<T>[]
}
