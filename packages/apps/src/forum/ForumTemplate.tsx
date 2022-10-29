import React from 'react'
import { Box, Grid, Container } from '@gravis-os/ui'
import PaginatedThreads, { PaginatedThreadsProps } from './PaginatedThreads'

export interface ForumTemplateProps {
  paginatedThreadsProps: PaginatedThreadsProps
}

const ForumTemplate: React.FC<ForumTemplateProps> = (props) => {
  const { paginatedThreadsProps } = props
  return (
    <Box>
      <Container>
        <Grid container>
          <Grid item xs={12} md={8}>
            <PaginatedThreads {...paginatedThreadsProps} />
          </Grid>
          <Grid item xs={12} md={4} />
        </Grid>
      </Container>
    </Box>
  )
}

export default ForumTemplate
