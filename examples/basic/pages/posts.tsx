import * as React from 'react'
import type { NextPage } from 'next'
import axios from 'axios'
import { Box, Button, Container, Typography } from '@gravis-os/ui'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import ProTip from '../src/ProTip'
import Copyright from '../src/Copyright'

const fetchPosts = async () => {
  /**
   * Known Issue NextJS #11993
   * Need to destructure to avoid `cannot be serialized as JSON` error
   * @see https://github.com/vercel/next.js/issues/11993
   */
  const { data } = await axios.get(
    'http://hn.algolia.com/api/v1/search?query=hello'
  )
  return data
}

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('posts', fetchPosts)
  return { props: { dehydratedState: dehydrate(queryClient) } }
}

const Posts: NextPage = () => {
  /**
   * React Query + NextJS SSG integration withHydration method
   * @link https://react-query.tanstack.com/guides/ssr
   * This useQuery could just as well happen in some deeper child to
   * the "Posts"-page, data will be available immediately either way
   */
  const onQuery = useQuery('posts', fetchPosts)
  const { data, refetch } = onQuery

  const posts = data?.hits || []

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Posts
        </Typography>

        <ul>
          {posts.map((post: { objectID: string; title: string }) => (
            <li key={post.objectID}>{post.title}</li>
          ))}
        </ul>
        <Button fullWidth variant="outlined" onClick={() => refetch()}>
          Refetch Data
        </Button>

        <Box maxWidth="sm" sx={{ mt: 4 }}>
          <Button href="/">Go to the home page</Button>
        </Box>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  )
}

export default Posts
