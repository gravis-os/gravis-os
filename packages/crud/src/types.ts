import { ColDef } from 'ag-grid-community/dist/lib/entities/colDef'

interface ExtendedCrudTableColumnDef {
  hide?: boolean | (({ user }) => boolean)
  hasAvatar?: boolean
  renderMoreItems?: any
}

export type CrudTableColumnDef = Omit<ColDef, 'hide'> &
  ExtendedCrudTableColumnDef
