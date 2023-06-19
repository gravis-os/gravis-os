import { CrudItem } from '@gravis-os/types'

export interface RenderListingCardsBlockItemProps {
  item: CrudItem & { [key: string]: string }
}

const renderListingCardsBlockItem = (
  props: RenderListingCardsBlockItemProps
) => {
  const { item } = props
  const { title, avatar_src, price } = item

  return [
    {
      type: 'image',
      title: avatar_src,
    },
    { type: 'body1', title },
    { type: 'body2', title: `Starting from ${price}` },
  ]
}

export default renderListingCardsBlockItem
