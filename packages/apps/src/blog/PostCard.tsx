import React from 'react'

import { StorageImage } from '@gravis-os/storage'
import { CrudModule } from '@gravis-os/types'
import {
  Card,
  CardContent,
  CardContentProps,
  CardProps,
  Link,
  Typography,
} from '@gravis-os/ui'

import { Post } from './types'

export interface PostCardProps extends CardProps {
  blogCategoryModule: CrudModule | any
  cardContentProps?: CardContentProps
  disableSubtitle?: boolean
  imageHeight?: number
  item: Post
  postModule: CrudModule | any
  reverse?: boolean
  size?: 'large' | 'medium' | 'small'
}

const PostCard: React.FC<PostCardProps> = (props) => {
  const {
    blogCategoryModule,
    cardContentProps,
    disableSubtitle,
    imageHeight,
    item,
    postModule,
    reverse,
    size,
    sx,
    ...rest
  } = props

  if (!item) return null

  const isSmall = size === 'small'
  const isLarge = size === 'large'

  const { id, title, blog_category, hero_alt, hero_src, subtitle } = item

  const postHref = postModule.getWebHref([
    blog_category?.blog,
    blog_category,
    item,
  ])

  return (
    <Card
      disableCardContent
      key={id}
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
          alt={hero_alt || title}
          ar="16:9"
          rounded
          scaleOnHover
          src={hero_src}
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
          <Typography gutterBottom variant="overline">
            {blog_category.title}
          </Typography>
        </Link>
        {/* prettier-ignore */}
        <Link href={postHref} variant={isLarge ? 'h4' : (isSmall ? 'h6' : 'h5')}>
          {title}
        </Link>
        {!disableSubtitle && subtitle && (
          <Typography
            color="text.secondary"
            maxLines={3}
            variant={isSmall ? 'body2' : 'body1'}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default PostCard
