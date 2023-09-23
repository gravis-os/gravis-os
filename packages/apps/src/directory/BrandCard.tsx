import React from 'react'

import { StorageImage } from '@gravis-os/storage'
import { CrudModule } from '@gravis-os/types'
import { Card, CardContent, CardProps, Link } from '@gravis-os/ui'

import { Brand } from './types'

export interface BrandCardProps extends CardProps {
  brandModule: CrudModule | any
  item: Brand
}

const BrandCard: React.FC<BrandCardProps> = (props) => {
  const { brandModule, href, item, sx, ...rest } = props

  if (!item) return null

  const { id, title, avatar_alt, avatar_src } = item

  const brandHref = href || brandModule.getWebHref([item])

  return (
    <Card
      disableCardContent
      key={id}
      square
      sx={{
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        width: '100%',
        ...sx,
      }}
      {...rest}
    >
      <Link href={brandHref}>
        <StorageImage
          alt={avatar_alt || title}
          height={110}
          scaleOnHover
          src={avatar_src}
          width={110}
        />
      </Link>
      <CardContent disableGutterBottom sx={{ height: '100%' }}>
        <Link href={brandHref} variant="h4">
          {title}
        </Link>
      </CardContent>
    </Card>
  )
}

export default BrandCard
