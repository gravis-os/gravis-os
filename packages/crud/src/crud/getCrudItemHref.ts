import { CrudItem, CrudModule } from '@gravis-os/types'

export interface GetCrudItemHrefParams {
  module: CrudModule
  item?: CrudItem
}

const getCrudItemHref = ({ module, item }: GetCrudItemHrefParams) =>
  `${module.route.plural}/${item?.[module.sk]}`

export default getCrudItemHref
