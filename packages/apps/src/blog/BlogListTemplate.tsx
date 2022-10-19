import React from 'react'
import { Box, Grid, Container } from '@gravis-os/ui'
import PostList, { PostListProps } from './PostList'

export interface BlogListTemplateProps extends PostListProps {}

const BlogListTemplate: React.FC<BlogListTemplateProps> = (props) => {
  const { items, itemProps } = props
  return (
    <Box>
      <Container>
        <Grid container>
          <Grid item xs={12} md={8}>
            <PostList items={items} itemProps={itemProps} />
          </Grid>
          <Grid item xs={12} md={4} />
        </Grid>
      </Container>
    </Box>
  )
}

export default BlogListTemplate
