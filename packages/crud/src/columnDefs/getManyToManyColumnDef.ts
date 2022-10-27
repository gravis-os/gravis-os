import { CrudModule } from '@gravis-os/types'

const getManyToManyColumnDef = (module: CrudModule) => {
  const fieldName = module.table.name
  return {
    field: `${fieldName}_ids`,
    valueGetter: ({ data }: { data: any }) => {
      const items = data[fieldName]
      if (!items?.length) return
      return items.map(({ title }) => title).join(', ')
    },
  }
}

export default getManyToManyColumnDef
