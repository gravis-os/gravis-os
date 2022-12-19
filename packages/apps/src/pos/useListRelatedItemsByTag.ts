import { useList } from '@gravis-os/query'
import { CrudItem, CrudModule } from '@gravis-os/types'

export interface UseListRelatedItemsByTagProps {
  tags?: Array<Record<string, unknown>>
  item: CrudItem & {
    tag_ids?: Array<Record<string, unknown>>
    tag?: Array<Record<string, unknown>>
  }
  module: CrudModule
  relatedModule: CrudModule
  joinModule?: CrudModule
}

const useListRelatedItemsByTag = (props: UseListRelatedItemsByTagProps) => {
  const { tags, item, module, relatedModule, joinModule } = props

  const relatedItemsTableName: string = relatedModule.table.name
  const isTheSameModule = module.table.name === relatedItemsTableName

  const relatedTags = tags || item?.tag_ids || item?.tag || []
  const relatedTagIds = relatedTags?.map(({ id }) => id)
  const hasRelatedTagIds = Boolean(relatedTagIds?.length)
  const onUseList = useList({
    disablePagination: true,
    module:
      joinModule ||
      ({
        select: { list: `*, ${relatedItemsTableName}(*)` },
        table: { name: `tag_${relatedItemsTableName}` },
      } as CrudModule),
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
    disableWorkspacePlugin: true,
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
