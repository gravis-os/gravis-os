import { useList } from '@gravis-os/query'
import { CrudModule } from '@gravis-os/types'

const useListRelatedItemsByTag = (props) => {
  const { item, module, relatedModule, joinModule } = props

  const relatedItemsTableName: string = relatedModule.table.name
  const isTheSameModule = module.table.name === relatedItemsTableName

  const relatedTags = item?.tag || []
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
