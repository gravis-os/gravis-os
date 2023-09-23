import { CrudItem, CrudModule } from '@gravis-os/types'

export interface GetCrudItemHrefParams {
  item?: CrudItem
  module: CrudModule
}

const getCrudItemHref = ({ item, module }: GetCrudItemHrefParams) =>
  `${module.route.plural}/${item?.[module.sk]}`

export default getCrudItemHref
