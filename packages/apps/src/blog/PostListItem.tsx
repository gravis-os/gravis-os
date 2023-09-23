import React from 'react'

import { StorageImage } from '@gravis-os/storage'
import { CrudModule } from '@gravis-os/types'
import {
  Box,
  BoxProps,
  Card,
  CardProps,
  Grid,
  Link,
  Typography,
} from '@gravis-os/ui'

import { Post } from './types'

export interface PostListItemProps extends CardProps {
  blogCategoryModule: CrudModule | any
  cardContentProps?: BoxProps
  item: Post
  postModule: CrudModule | any
  size?: 'large' | 'medium' | 'small'
}

const PostListItem: React.FC<PostListItemProps> = (props) => {
  const {
    blogCategoryModule,
    cardContentProps,
    item,
    postModule,
    size = 'medium',
    sx,
    ...rest
  } = props

  if (!item) return null

  const isSmall = size === 'small'
  const isLarge = size === 'large'

  const { id, title, avatar_alt, avatar_src, blog_category, subtitle } = item

  const postHref = postModule.getWebHref([
    blog_category?.blog,
    blog_category,
    item,
  ])

  return (
    <Card disableCardContent key={id} square sx={{ ...sx }} {...rest}>
      <Grid container spacing={2}>
        <Grid item lg={isSmall ? 4 : 3} xs={3}>
          <Link href={postHref}>
            <StorageImage
              alt={avatar_alt || title}
              ar="4:3"
              rounded
              scaleOnHover
              src={avatar_src}
            />
          </Link>
        </Grid>
        <Grid item lg={isSmall ? 8 : 9} xs={9}>
          <Box
            mr={2}
            py={2}
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
              <Typography gutterBottom variant="overline">
                {blog_category.title}
              </Typography>
            </Link>
            <Link
              href={postHref}
              // prettier-ignore
              variant={isLarge ? 'h4' : (isSmall ? 'h6' : 'h5')}
            >
              {title}
            </Link>
            {subtitle && (
              <Typography
                color="text.secondary"
                maxLines={3}
                variant={isSmall ? 'body2' : 'body1'}
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
