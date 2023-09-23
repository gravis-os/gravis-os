import React from 'react'

import { StorageAvatarWithUpload } from '@gravis-os/storage'
import { CrudItem, CrudModule } from '@gravis-os/types'
import { Card, CardProps, Stack, Typography } from '@gravis-os/ui'

export interface DetailBannerProps {
  cardProps?: CardProps
  item: CrudItem
  module: CrudModule
}

const DetailBanner: React.FC<DetailBannerProps> = (props) => {
  const { cardProps, item, module } = props
  const { title, subtitle } = item || {}

  // Show avatar only when crud item has avatar_src
  const hasAvatar = 'avatar_src' in item

  return (
    <Card square {...cardProps}>
      <Stack alignItems="center" direction="row" spacing={1}>
        {/* Left */}
        <Stack alignItems="center" direction="row" spacing={1}>
          {hasAvatar && (
            <StorageAvatarWithUpload
              editable
              item={item}
              module={module}
              src={item.avatar_src}
            />
          )}

          <div>
            <Typography variant="h3">{title}</Typography>
            {subtitle && (
              <Typography color="text.secondary" variant="body1">
                {subtitle}
              </Typography>
            )}
          </div>
        </Stack>

        {/* Right */}
      </Stack>
    </Card>
  )
}

export default DetailBanner
