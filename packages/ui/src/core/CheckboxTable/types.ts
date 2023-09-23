export type CheckboxTableColumn = string
export type CheckboxTableColumns = CheckboxTableColumn[]

export interface CheckboxTableColumnDef {
  label: string
  value: string
  width: number | string
}
export type CheckboxTableColumnDefs = CheckboxTableColumnDef[]

export interface CheckboxTableColumnCell<T> {
  checked: boolean
  key: number | string
  onChange: (checked: boolean, value: T) => void
  value: T
}

export interface CheckboxTableRows<T> {
  [name: string]: CheckboxTableColumnCell<T>[]
}
