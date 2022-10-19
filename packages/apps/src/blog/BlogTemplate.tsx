import React from 'react'
import { Box, Grid, Container } from '@gravis-os/ui'
import PaginatedPosts, { PaginatedPostsProps } from './PaginatedPosts'

export interface BlogTemplateProps {
  paginatedPostsProps: PaginatedPostsProps
}

const BlogTemplate: React.FC<BlogTemplateProps> = (props) => {
  const { paginatedPostsProps } = props
  return (
    <Box>
      <Container>
        <Grid container>
          <Grid item xs={12} md={8}>
            <PaginatedPosts {...paginatedPostsProps} />
          </Grid>
          <Grid item xs={12} md={4} />
        </Grid>
      </Container>
    </Box>
  )
}

export default BlogTemplate
