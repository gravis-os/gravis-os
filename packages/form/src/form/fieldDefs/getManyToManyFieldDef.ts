import { CrudModule } from '@gravis-os/types'

const getManyToManyFieldDef = (module: CrudModule) => {
  const fieldName = module.table.name
  return {
    disableCloseOnSelect: true,
    key: `${fieldName}_ids`,
    module,
    multiple: true,
    name: `${fieldName}_ids`,
    type: 'model',
  }
}

export default getManyToManyFieldDef
