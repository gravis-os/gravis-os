import { BlockItemTypeEnum } from './constants'
import { BlockItemProps } from './BlockItem'

export interface BlockItemShortHandProps {
  [key: string]:
    | {
        title: string
      }
    | string
}

const withBlockItemShorthand = () => (items: BlockItemProps[]) => {
  /**
   * Normalize shorthand syntax back to the full extended version
   * @param items
   */
  const getBlockItemsWithoutShorthand = (items) => {
    return items.reduce((acc, item) => {
      const { type } = item
      const isShorthand = !type

      // Escape default/full syntax
      if (!isShorthand) return acc.concat(item)

      // Shorthand
      return [
        ...acc,

        ...Object.entries(item).reduce(
          (itemAcc, [type, value]: [string, string | BlockItemProps]) => {
            // Only allow valid types
            const isValidType = (
              Object.values(BlockItemTypeEnum) as string[]
            ).includes(type)
            if (!isValidType) return itemAcc.concat({ [type]: value })

            // @example - items: [{ body1: 'Body1 in string syntax' }],
            if (typeof value === 'string') {
              return [...itemAcc, { type, title: value }]
            }

            // Take stackItems or gridItems, and resolve them recursively
            const { stackItems, gridItems } = value as BlockItemProps
            const recursiveItems = stackItems || gridItems
            const hasRecursiveItems = Boolean(recursiveItems)
            if (hasRecursiveItems) {
              const nextRecursiveItems = recursiveItems.map((recursiveItem) => {
                return {
                  ...recursiveItem,
                  items: getBlockItemsWithoutShorthand(recursiveItem.items),
                }
              })

              return [
                ...itemAcc,
                // TODO@Joel: Check if it is grid or stack
                { type, ...value, stackItems: nextRecursiveItems },
              ]
            }

            // @example - items: [{ body1: { title: 'Body1 in object syntax', titleProps: { mt: 2  } }],
            return [...itemAcc, { type, ...(value as BlockItemProps) }]
          },
          []
        ),
      ]
    }, [])
  }

  return getBlockItemsWithoutShorthand(items)
}

export default withBlockItemShorthand
