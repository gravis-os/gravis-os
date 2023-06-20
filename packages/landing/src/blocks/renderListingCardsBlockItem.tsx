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
      type: 'storage_image',
      title: avatar_src,
    },
    { type: 'body1', title, titleProps: { fontWeight: 'bold', mt: 2 } },
    {
      type: 'body2',
      title: `Starting from $${parseInt(price, 10).toLocaleString()}`,
      titleProps: { mt: 1 },
    },
  ]
}

export default renderListingCardsBlockItem
