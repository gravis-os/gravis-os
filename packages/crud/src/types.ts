import { ColDef } from 'ag-grid-community/dist/lib/entities/colDef'

interface ExtendedCrudTableColumnDef {
  avatarSxProps?: any
  containerSxProps?: any
  hasAvatar?: boolean
  hasCheckboxSelection?: boolean
  hide?: (({ user }) => boolean) | boolean
  renderMoreItems?: any
}

export type CrudTableColumnDef = Omit<ColDef, 'hide'> &
  ExtendedCrudTableColumnDef
