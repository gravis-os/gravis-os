import React from 'react'
import { Card, CardContent, CardProps, Link, Typography } from '@gravis-os/ui'
import { CrudModule } from '@gravis-os/types'
import { StorageImage } from '@gravis-os/storage'
import { Post } from './types'

export interface PostCardProps extends CardProps {
  item: Post
  postModule: CrudModule | any
  blogCategoryModule: CrudModule | any
}

const PostCard: React.FC<PostCardProps> = (props) => {
  const { item, blogCategoryModule, postModule, sx, ...rest } = props

  if (!item) return null

  const { title, subtitle, avatar_src, avatar_alt, blog_category } = item

  const postHref = postModule.getWebHref([
    blog_category.blog,
    blog_category,
    item,
  ])

  return (
    <Card
      key={item.id}
      disableCardContent
      square
      sx={{ height: '100%', ...sx }}
      {...rest}
    >
      <Link href={postHref}>
        <StorageImage src={avatar_src} alt={avatar_alt || title} scaleOnHover />
      </Link>

      <CardContent disableGutterBottom sx={{ height: '100%' }}>
        <Link variant="h4" href={postHref}>
          {title}
        </Link>
        <Typography>{subtitle}</Typography>
      </CardContent>
    </Card>
  )
}

export default PostCard
