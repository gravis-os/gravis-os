import React from 'react'
import { Box, Grid, Stack, Typography } from '@gravis-os/ui'
import { CrudItem, CrudModuleWithGetWebHref } from '@gravis-os/types'
import {
  PaginatedQueryViewProps,
  PaginatedQueryViewVariantEnum,
  useList,
} from '@gravis-os/query'
import { useCreateMutation } from '@gravis-os/crud'
import { withSlugFromTitle, withResolvedIdValue } from '@gravis-os/form'
import { useUser } from '@gravis-os/auth'
import { flowRight } from 'lodash'
import { useListParentCategorys, CategorysSideBar } from '../categories'
import PaginatedThreads from './PaginatedThreads'
import { ThreadFormProps } from './ThreadForm'
import ThreadFormDialog from './ThreadFormDialog'
import { AdOrder, AdOrderProps } from '../ads'
import ThreadListItem from './ThreadListItem'

export interface ForumTemplateProps {
  forumModule: CrudModuleWithGetWebHref
  forumCategoryModule: CrudModuleWithGetWebHref
  threadModule: CrudModuleWithGetWebHref
  threadsQueryResult: PaginatedQueryViewProps['queryResult']
  forum?: CrudItem
  forumCategory?: CrudItem
  threadFormProps?: ThreadFormProps
  adOrderProps?: AdOrderProps
}

const ForumTemplate: React.FC<ForumTemplateProps> = (props) => {
  const {
    threadsQueryResult,
    forumCategoryModule,
    threadModule,
    forumModule,
    forum,
    forumCategory,
    threadFormProps: injectedThreadFormProps,
    adOrderProps,
  } = props

  // Fetch forum categories
  const { items: forumCategorys } = useListParentCategorys({
    categoryModule: forumCategoryModule,
    categoryTypeModule: forumModule,
    categoryTypeId: forum?.id && Number(forum.id),
  })

  // Fetch popular threads
  const { items: popularThreads } = useList({
    module: threadModule,
    order: ['view_count', { ascending: false }],
    limit: 6,
  })

  const { items: threads, pagination } = threadsQueryResult
  const paginatedThreadsProps = {
    pagination,
    queryResult: threadsQueryResult,
    gridProps: { spacing: 2 },
    items: threads,
    itemProps: { threadModule, forumCategoryModule, size: 'medium' },
    variant: PaginatedQueryViewVariantEnum.Grid,
  }

  // Thread Form
  const { user } = useUser()
  const { person, workspace } = user
  const { createMutation: createThreadMutation } = useCreateMutation({
    module: threadModule,
  })
  const threadFormProps = {
    ...injectedThreadFormProps,
    onSubmit: async (values) => {
      const { title, content, slug, forum_category_id } = flowRight([
        withSlugFromTitle(),
        withResolvedIdValue(),
      ])(values)

      const nextValues = {
        workspace_id: workspace.id,
        person_id: person.id,
        forum_category_id: forumCategory?.id || forum_category_id,
        title,
        slug,
        content,
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
            <Typography variant="h5" gutterBottom>
              Categories
            </Typography>
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
        {/* Right Aside */}
        <Grid item md={3} lg={3}>
          {threadFormProps && (
            <Box sx={{ mb: 2 }}>
              <ThreadFormDialog
                threadFormProps={threadFormProps}
                forumCategorys={forumCategorys}
                forumCategory={forumCategory}
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
                    key={popularThread.id}
                    threadModule={threadModule}
                    item={popularThread}
                    size="small"
                    disableBoxShadow
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
