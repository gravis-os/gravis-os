import { CrudItem } from '@gravis-os/types'

export interface renderBrandBlockItemProps {
  item: CrudItem & { [key: string]: string }
}

const renderBrandBlockItem = (props: renderBrandBlockItemProps) => {
  const { item } = props
  const { slug, title, avatar_src } = item

  return [
    {
      type: 'image',
      title: avatar_src,
    },
    { type: 'body1', title },
  ]
}

export default renderBrandBlockItem
