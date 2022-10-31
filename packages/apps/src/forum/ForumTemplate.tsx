import React from 'react'
import { Box, Grid, Stack, Typography } from '@gravis-os/ui'
import { CrudItem } from '@gravis-os/types'
import {
  PaginatedQueryViewProps,
  PaginatedQueryViewVariantEnum,
} from '@gravis-os/query'
import { CrudModuleWithGetWebHref } from './types'
import { useListParentCategorys, CategorysSideBar } from '../categories'
import PaginatedThreads from './PaginatedThreads'

export interface ForumTemplateProps {
  rightAside?: React.ReactNode
  forumModule: CrudModuleWithGetWebHref
  forumCategoryModule: CrudModuleWithGetWebHref
  threadModule: CrudModuleWithGetWebHref
  threadsQueryResult: PaginatedQueryViewProps['queryResult']
  forum?: CrudItem
}

const ForumTemplate: React.FC<ForumTemplateProps> = (props) => {
  const {
    rightAside,
    threadsQueryResult,
    forumCategoryModule,
    threadModule,
    forumModule,
    forum,
  } = props

  // Fetch forum categories
  const { items: forumCategorys } = useListParentCategorys({
    categoryModule: forumCategoryModule,
    categoryTypeModule: forumModule,
    categoryTypeId: forum?.id && Number(forum.id),
  })

  const { items: threads, pagination } = threadsQueryResult
  const paginatedThreadsProps = {
    pagination,
    queryResult: threadsQueryResult,
    items: threads,
    itemProps: { threadModule, forumCategoryModule, size: 'medium' },
    variant: PaginatedQueryViewVariantEnum.Grid,
  }

  return (
    <Box>
      <Grid container spacing={{ xs: 4, md: 2 }}>
        <Grid item lg={2}>
          {/* Categories */}
          <Stack spacing={1.25}>
            <Typography variant="h5">Categories</Typography>
            <CategorysSideBar
              items={forumCategorys}
              getHref={(item) =>
                forumCategoryModule.getWebHref([item.forum, item])
              }
            />
          </Stack>
        </Grid>
        <Grid item md={9} lg={7}>
          <PaginatedThreads {...paginatedThreadsProps} />
        </Grid>
        <Grid item md={3} lg={3}>
          {rightAside}
        </Grid>
      </Grid>
    </Box>
  )
}

export default ForumTemplate
