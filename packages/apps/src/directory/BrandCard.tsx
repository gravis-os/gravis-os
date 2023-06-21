import React from 'react'
import { Card, CardContent, CardProps, Link } from '@gravis-os/ui'
import { CrudModule } from '@gravis-os/types'
import { StorageImage } from '@gravis-os/storage'
import { Brand } from './types'

export interface BrandCardProps extends CardProps {
  item: Brand
  brandModule: CrudModule | any
}

const BrandCard: React.FC<BrandCardProps> = (props) => {
  const { item, brandModule, sx, ...rest } = props

  if (!item) return null

  const { title, avatar_src, avatar_alt } = item

  const brandHref = brandModule.getWebHref([item])

  return (
    <Card
      key={item.id}
      disableCardContent
      square
      sx={{
        height: '100%',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        ...sx,
      }}
      {...rest}
    >
      <Link href={brandHref}>
        <StorageImage
          width={110}
          height={110}
          src={avatar_src}
          alt={avatar_alt || title}
          scaleOnHover
        />
      </Link>
      <CardContent disableGutterBottom sx={{ height: '100%' }}>
        <Link variant="h4" href={brandHref}>
          {title}
        </Link>
      </CardContent>
    </Card>
  )
}

export default BrandCard
