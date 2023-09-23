/* eslint-disable unicorn/consistent-function-scoping */

import { BlockProps } from './Block'
import { BlockItemProps } from './BlockItem'
import { BlockItemTypeEnum } from './constants'

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
    if (!items?.length) return []
    return items.reduce((acc, item) => {
      const { type } = item
      if (!type) return acc
      const isShorthand = !type

      // Escape default/full syntax
      if (!isShorthand) return acc.concat(item)

      // Shorthand
      return [
        ...acc,

        ...Object.entries(item).reduce(
          (itemAcc, [type, value]: [string, BlockItemProps | string]) => {
            // Only allow valid types
            const isValidType = (
              Object.values(BlockItemTypeEnum) as string[]
            ).includes(type)
            if (!isValidType) return itemAcc.concat({ [type]: value })

            // @example - items: [{ body1: 'Body1 in string syntax' }],
            if (typeof value === 'string') {
              return [...itemAcc, { title: value, type }]
            }

            // Take stackItems or gridItems, and resolve them recursively
            const { gridItems, stackItems } = value as BlockItemProps
            const recursiveItems = stackItems || gridItems
            const hasRecursiveItems = Boolean(recursiveItems)
            if (hasRecursiveItems) {
              const nextRecursiveItems = recursiveItems.map((recursiveItem) => {
                return {
                  ...recursiveItem,
                  items: getBlockItemsWithoutShorthand(
                    (recursiveItem as BlockProps).items
                  ),
                }
              })

              // Define the type of recursiveItem for overriding via object spread
              const recursiveItemsKey = `${type}Items`

              return [
                ...itemAcc,
                { type, ...value, [recursiveItemsKey]: nextRecursiveItems },
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
