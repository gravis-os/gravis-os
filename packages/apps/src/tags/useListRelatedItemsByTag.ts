import { useList } from '@gravis-os/query'
import { CrudItem, CrudModule } from '@gravis-os/types'

export interface UseListRelatedItemsByTagProps {
  item: CrudItem & {
    tag?: Array<Record<string, unknown>>
    tag_ids?: Array<Record<string, unknown>>
  }
  joinModule?: CrudModule
  module: CrudModule
  relatedModule: CrudModule
  tags?: Array<Record<string, unknown>>
}

const useListRelatedItemsByTag = (props: UseListRelatedItemsByTagProps) => {
  const { item, joinModule, module, relatedModule, tags } = props

  const relatedItemsTableName: string = relatedModule.table.name
  const isTheSameModule = module.table.name === relatedItemsTableName

  const relatedTags = tags || item?.tag_ids || item?.tag || []
  const relatedTagIds = relatedTags?.map(({ id }) => id)
  const hasRelatedTagIds = Boolean(relatedTagIds?.length)
  const onUseList = useList({
    disablePagination: true,
    disableWorkspacePlugin: true,
    filters: [
      hasRelatedTagIds && {
        key: 'tag_id',
        op: 'in',
        value: `(${relatedTagIds.join(',')})`,
      },
      isTheSameModule && {
        key: `${relatedItemsTableName}_id`,
        op: 'neq',
        value: item.id,
      },
    ],
    limit: 3,
    module:
      joinModule ||
      ({
        select: { list: `*, ${relatedItemsTableName}(*)` },
        table: { name: `tag_${relatedItemsTableName}` },
      } as CrudModule),
    queryOptions: { enabled: hasRelatedTagIds },
  })

  return {
    ...onUseList,
    items: onUseList.items?.filter(Boolean)?.map((item) => {
      return item[relatedItemsTableName]
    }),
  }
}

export default useListRelatedItemsByTag
