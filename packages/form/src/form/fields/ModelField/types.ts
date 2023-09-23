export interface ModelFieldDataItem {
  [key: string]: unknown
  id?: number | string
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
