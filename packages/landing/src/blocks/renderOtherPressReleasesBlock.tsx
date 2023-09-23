import { PressRelease } from '@gravis-os/types'
import orderBy from 'lodash/orderBy'

import { useLayout } from '../providers/LayoutProvider'
import { BlockProps } from '../web/Block/Block'
import renderPostBlockItem, {
  RenderPostBlockItemProps,
} from './renderPostBlockItem'

export interface RenderOtherPressReleasesBlockProps
  extends Omit<BlockProps, 'items'> {
  items?: PressRelease[]
}

const renderOtherPressReleasesBlock = (
  props: RenderOtherPressReleasesBlockProps
) => {
  const { items, ...rest } = props
  const { routeConfig } = useLayout()
  if (!items?.length) return
  return {
    id: 'other-press-releases',
    items: [
      {
        title: 'Other News',
        titleProps: { sx: { mb: { xs: 3, md: 5 } } },
        type: 'h4',
      },
      {
        gridItems: orderBy(items, 'published_at', 'desc').map((item) => {
          return renderPostBlockItem({
            item: {
              href: `${routeConfig?.PRESS_RELEASES}/${item.slug}`,
              ...(item as RenderPostBlockItemProps['item']),
            },
          })
        }),
        type: 'grid',
      },
    ],
    ...rest,
  }
}

export default renderOtherPressReleasesBlock
