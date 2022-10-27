import { CrudModule } from '@gravis-os/types'

const getManyToManyFieldDef = (module: CrudModule) => {
  const fieldName = module.table.name
  return {
    key: `${fieldName}_ids`,
    name: `${fieldName}_ids`,
    type: 'model',
    module,
    multiple: true,
    disableCloseOnSelect: true,
  }
}

export default getManyToManyFieldDef
