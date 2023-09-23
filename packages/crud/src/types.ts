import { ColDef } from 'ag-grid-community/dist/lib/entities/colDef'

interface ExtendedCrudTableColumnDef {
  hasAvatar?: boolean
  hasCheckboxSelection?: boolean
  hide?: (({ user }) => boolean) | boolean
  renderMoreItems?: any
}

export type CrudTableColumnDef = Omit<ColDef, 'hide'> &
  ExtendedCrudTableColumnDef
