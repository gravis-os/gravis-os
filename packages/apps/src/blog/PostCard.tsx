import React from 'react'
import {
  Card,
  CardContent,
  CardContentProps,
  CardProps,
  Link,
  Typography,
} from '@gravis-os/ui'
import { CrudModule } from '@gravis-os/types'
import { StorageImage } from '@gravis-os/storage'
import { Post } from './types'

export interface PostCardProps extends CardProps {
  item: Post
  postModule: CrudModule | any
  blogCategoryModule: CrudModule | any
  size?: 'small' | 'medium' | 'large'
  reverse?: boolean
  disableSubtitle?: boolean
  cardContentProps?: CardContentProps
  imageHeight?: number
}

const PostCard: React.FC<PostCardProps> = (props) => {
  const {
    item,
    blogCategoryModule,
    postModule,
    sx,
    size,
    reverse,
    cardContentProps,
    disableSubtitle,
    imageHeight,
    ...rest
  } = props

  if (!item) return null

  const isSmall = size === 'small'
  const isLarge = size === 'large'

  const { title, subtitle, hero_src, hero_alt, blog_category } = item

  const postHref = postModule.getWebHref([
    blog_category?.blog,
    blog_category,
    item,
  ])

  return (
    <Card
      key={item.id}
      disableCardContent
      square
      stretch
      sx={{
        display: 'flex',
        flexDirection: reverse ? 'column-reverse' : 'column',
        ...sx,
      }}
      {...rest}
    >
      <Link
        href={postHref}
        sx={{
          overflow: 'hidden',
          ...(reverse && { mt: 1 }),
          ...(imageHeight && { height: imageHeight }),
        }}
      >
        <StorageImage
          src={hero_src}
          alt={hero_alt || title}
          scaleOnHover
          ar="16:9"
          rounded
        />
      </Link>

      <CardContent
        disableGutterBottom
        sx={{
          ...(rest?.stretch && { height: '100%' }),
          ...cardContentProps?.sx,
        }}
        {...cardContentProps}
      >
        <Link
          href={blogCategoryModule.getWebHref([
            blog_category.blog,
            blog_category,
          ])}
        >
          <Typography variant="overline" gutterBottom>
            {blog_category.title}
          </Typography>
        </Link>
        <Link variant={isLarge ? 'h4' : isSmall ? 'h6' : 'h5'} href={postHref}>
          {title}
        </Link>
        {!disableSubtitle && subtitle && (
          <Typography
            variant={isSmall ? 'body2' : 'body1'}
            color="text.secondary"
            maxLines={3}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default PostCard
