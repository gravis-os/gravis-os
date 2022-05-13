import React from 'react'
import { Card, CardProps, Stack, Typography } from '@gravis-os/ui'
import { StorageAvatarWithUpload } from '@gravis-os/storage'
import { CrudItem, CrudModule } from './typings'

export interface DetailBannerProps {
  cardProps?: CardProps
  module: CrudModule
  item: CrudItem
}

const DetailBanner: React.FC<DetailBannerProps> = props => {
  const { item, module, cardProps } = props
  const { title, subtitle } = item || {}

  // Show avatar only when crud item has avatar_src
  const hasAvatar = 'avatar_src' in item

  return (
    <Card square {...cardProps}>
      <Stack direction="row" alignItems="center" spacing={1}>
        {/* Left */}
        <Stack direction="row" alignItems="center" spacing={1}>
          {hasAvatar && (
            <StorageAvatarWithUpload
              item={item}
              module={module}
              src={item.avatar_src}
              editable
            />
          )}

          <div>
            <Typography variant="h3">{title}</Typography>
            {subtitle && (
              <Typography variant="body1" color="text.secondary">
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
