export interface ModelFieldDataItem {
  [key: string]: unknown
  id?: string | number
}

export type AutocompleteListDataItem = [
  React.HTMLAttributes<HTMLLIElement>,
  ModelFieldDataItem,
  string,
  ModelFieldDataItem | ModelFieldDataItem[],
  ({
    option,
    pk,
  }: {
    option: ModelFieldDataItem
    pk: string
  }) => React.ReactNode
]
