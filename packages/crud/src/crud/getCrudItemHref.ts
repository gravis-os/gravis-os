import { CrudItem, CrudModule } from '@gravis-os/types'

export interface GetCrudItemHrefParams {
  module: CrudModule
  item?: CrudItem
  appendedHref?: string
}

const getCrudItemHref = ({
  module,
  item,
  appendedHref = '',
}: GetCrudItemHrefParams) =>
  `${module.route.plural}/${item?.[module.sk]}${appendedHref}`

export default getCrudItemHref
