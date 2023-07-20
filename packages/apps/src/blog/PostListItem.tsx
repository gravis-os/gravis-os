import React from 'react'
import {
  Box,
  BoxProps,
  Card,
  CardProps,
  Grid,
  Link,
  Typography,
} from '@gravis-os/ui'
import { StorageImage } from '@gravis-os/storage'
import { CrudModule } from '@gravis-os/types'
import { Post } from './types'

export interface PostListItemProps extends CardProps {
  item: Post
  postModule: CrudModule | any
  blogCategoryModule: CrudModule | any
  size?: 'small' | 'medium' | 'large'
  cardContentProps?: BoxProps
}

const PostListItem: React.FC<PostListItemProps> = (props) => {
  const {
    item,
    size = 'medium',
    postModule,
    blogCategoryModule,
    cardContentProps,
    sx,
    ...rest
  } = props

  if (!item) return null

  const isSmall = size === 'small'
  const isLarge = size === 'large'

  const { title, subtitle, avatar_src, avatar_alt, blog_category } = item

  const postHref = postModule.getWebHref([
    blog_category?.blog,
    blog_category,
    item,
  ])

  return (
    <Card key={item.id} disableCardContent square sx={{ ...sx }} {...rest}>
      <Grid container spacing={2}>
        <Grid item xs={3} lg={isSmall ? 4 : 3}>
          <Link href={postHref}>
            <StorageImage
              src={avatar_src}
              alt={avatar_alt || title}
              scaleOnHover
              ar="4:3"
              rounded
            />
          </Link>
        </Grid>
        <Grid item xs={9} lg={isSmall ? 8 : 9}>
          <Box
            py={2}
            mr={2}
            stretch
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
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
            <Link
              variant={isLarge ? 'h4' : isSmall ? 'h6' : 'h5'}
              href={postHref}
            >
              {title}
            </Link>
            {subtitle && (
              <Typography
                variant={isSmall ? 'body2' : 'body1'}
                color="text.secondary"
                maxLines={3}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default PostListItem
