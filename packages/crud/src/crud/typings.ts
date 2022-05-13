export interface CrudModule {
  pk?: string // primary key - used for display e.g. title
  sk: string // slug key - used for route e.g. slug
  name: { singular: string; plural: string }
  route: { plural: string }
  table: { name: string }
  select?: { detail?: string; list?: string }
  Icon?: React.ElementType
}

export type CrudItem =
  | {
      id: number
      title: string
      subtitle?: string
      avatar_src?: string
    }
  | undefined
  | null
