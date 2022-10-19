import React from 'react'
import { Box, Card, CardProps, Grid, Link, Typography } from '@gravis-os/ui'
import { StorageImage } from '@gravis-os/storage'
import { CrudModule } from '@gravis-os/types'
import { Post } from './types'

export interface PostListItemProps extends CardProps {
  item: Post
  postModule: CrudModule | any
  blogCategoryModule: CrudModule | any
}

const PostListItem: React.FC<PostListItemProps> = (props) => {
  const { item, postModule, blogCategoryModule, sx, ...rest } = props

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
      <Grid container spacing={2}>
        <Grid item xs={3} lg={2}>
          <Link href={postHref}>
            <StorageImage
              src={avatar_src}
              alt={avatar_alt || title}
              scaleOnHover
            />
          </Link>
        </Grid>
        <Grid item xs={9} lg={10}>
          <Box
            py={2}
            stretch
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Link
              variant="overline"
              href={blogCategoryModule.getWebHref([blog_category])}
              color="secondary"
            >
              {blog_category?.title}
            </Link>
            <Link variant="h4" href={postHref}>
              {title}
            </Link>
            <Typography>{subtitle}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default PostListItem
