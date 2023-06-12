import orderBy from 'lodash/orderBy'
import { PressRelease } from '@gravis-os/types'
import { useLayout } from '../providers'
import { BlockProps } from '../web'
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
    key: 'other-press-releases',
    items: [
      {
        type: 'h4',
        title: 'Other News',
        titleProps: { sx: { mb: { xs: 3, md: 5 } } },
      },
      {
        type: 'grid',
        gridItems: orderBy(items, 'published_at', 'desc').map((item) => {
          return renderPostBlockItem({
            item: {
              href: `${routeConfig?.PRESS_RELEASES}/${item.slug}`,
              ...(item as RenderPostBlockItemProps['item']),
            },
          })
        }),
      },
    ],
    ...rest,
  }
}

export default renderOtherPressReleasesBlock
