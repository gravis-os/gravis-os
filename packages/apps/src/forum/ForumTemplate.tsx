import React from 'react'

import { useUser } from '@gravis-os/auth'
import { useCreateMutation } from '@gravis-os/crud'
import { withResolvedIdValue, withSlugFromTitle } from '@gravis-os/form'
import {
  PaginatedQueryViewProps,
  PaginatedQueryViewVariantEnum,
  useList,
} from '@gravis-os/query'
import {
  CrudItem,
  CrudModuleWithGetWebHref,
  DbUserWithAuthUser,
} from '@gravis-os/types'
import { Box, Grid, Stack, Typography } from '@gravis-os/ui'
import flowRight from 'lodash/flowRight'

import { AdOrder, AdOrderProps } from '../ads'
import { CategorysSideBar, useListParentCategorys } from '../categories'
import PaginatedThreads from './PaginatedThreads'
import { ThreadFormProps } from './ThreadForm'
import ThreadFormDialog from './ThreadFormDialog'
import ThreadListItem from './ThreadListItem'

export interface ForumTemplateProps {
  adOrderProps?: AdOrderProps
  forum?: CrudItem
  forumCategory?: CrudItem
  forumCategoryModule: CrudModuleWithGetWebHref
  forumModule: CrudModuleWithGetWebHref
  threadFormProps?: ThreadFormProps
  threadModule: CrudModuleWithGetWebHref
  threadsQueryResult: PaginatedQueryViewProps['queryResult']
}

const ForumTemplate: React.FC<ForumTemplateProps> = (props) => {
  const {
    adOrderProps,
    forum,
    forumCategory,
    forumCategoryModule,
    forumModule,
    threadFormProps: injectedThreadFormProps,
    threadModule,
    threadsQueryResult,
  } = props

  // Fetch forum categories
  const { items: forumCategorys } = useListParentCategorys({
    categoryModule: forumCategoryModule,
    categoryTypeId: forum?.id && Number(forum.id),
    categoryTypeModule: forumModule,
  })

  // Fetch popular threads
  const { items: popularThreads } = useList({
    limit: 6,
    module: threadModule,
    order: ['view_count', { ascending: false }],
  })

  const { items: threads, pagination } = threadsQueryResult
  const paginatedThreadsProps = {
    gridProps: { spacing: 2 },
    itemProps: { forumCategoryModule, size: 'medium', threadModule },
    items: threads,
    pagination,
    queryResult: threadsQueryResult,
    variant: PaginatedQueryViewVariantEnum.Grid,
  }

  // Thread Form
  const { user } = useUser<DbUserWithAuthUser>()
  const { person } = user
  const { id, workspace } = person
  const { createMutation: createThreadMutation } = useCreateMutation({
    module: threadModule,
  })
  const threadFormProps = {
    ...injectedThreadFormProps,
    onSubmit: async (values) => {
      const { title, slug, content, forum_category_id } = flowRight([
        withSlugFromTitle(),
        withResolvedIdValue(),
      ])(values)

      const nextValues = {
        title,
        slug,
        content,
        forum_category_id: forumCategory?.id || forum_category_id,
        person_id: id,
        workspace_id: workspace.id,
      }

      return createThreadMutation.mutate(nextValues)
    },
  }

  return (
    <Box>
      <Grid container spacing={{ xs: 4, md: 2 }}>
        <Grid item lg={2}>
          {/* Categories */}
          <Stack spacing={1.25}>
            <Typography gutterBottom variant="h5">
              Categories
            </Typography>
            <CategorysSideBar
              getHref={(item) =>
                forumCategoryModule.getWebHref([item.forum, item])
              }
              items={forumCategorys}
            />
          </Stack>
        </Grid>
        <Grid item lg={7} md={9}>
          <PaginatedThreads {...paginatedThreadsProps} />
        </Grid>
        {/* Right Aside */}
        <Grid item lg={3} md={3}>
          {threadFormProps && (
            <Box sx={{ mb: 2 }}>
              <ThreadFormDialog
                forumCategory={forumCategory}
                forumCategorys={forumCategorys}
                threadFormProps={threadFormProps}
              />
            </Box>
          )}

          {/* Ad Order */}
          {adOrderProps && <AdOrder {...adOrderProps} />}

          {/* Popular Threads */}
          {Boolean(popularThreads?.length) && (
            <Stack spacing={1.25}>
              <Typography variant="h5">Most Popular</Typography>
              {popularThreads.map((popularThread) => {
                if (!popularThread) return null
                return (
                  <ThreadListItem
                    disableBoxShadow
                    item={popularThread}
                    key={popularThread.id}
                    size="small"
                    threadModule={threadModule}
                  />
                )
              })}
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default ForumTemplate
