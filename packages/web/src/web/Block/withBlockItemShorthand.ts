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
  return items.reduce((acc, item) => {
    const { type } = item
    const isShorthand = !type

    if (!isShorthand) return acc.concat(item)

    // Shorthand
    return [
      ...acc,
      ...Object.entries(item).reduce((itemAcc, [type, value]) => {
        const isValidType = (
          Object.values(BlockItemTypeEnum) as string[]
        ).includes(type)
        if (!isValidType) return itemAcc

        // @example - items: [{ body1: 'Body1 in string syntax' }],
        if (typeof value === 'string') {
          return [...itemAcc, { type, title: value }]
        }

        // @example - items: [{ body1: { title: 'Body1 in object syntax', mt: 2 } }],
        return [...itemAcc, { type, ...(value as BlockItemProps) }]
      }, []),
    ]
  }, [])
}

export default withBlockItemShorthand
