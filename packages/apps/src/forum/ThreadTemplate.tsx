import React from 'react'

import { useIncrementCount } from '@gravis-os/query'
import { CrudModuleWithGetWebHref } from '@gravis-os/types'
import { Box, Container, Grid, Link, Stack, Typography } from '@gravis-os/ui'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined'

import { AdOrder, AdOrderProps } from '../ads'
import { Listing, ListingListItem } from '../directory'
import ThreadCard from './ThreadCard'
import ThreadCommentCard from './ThreadCommentCard'
import ThreadCommentForm, { ThreadCommentFormProps } from './ThreadCommentForm'
import ThreadListItem from './ThreadListItem'
import { Thread, ThreadComment } from './types'

export interface ThreadTemplateProps {
  // AdOrderProps
  adOrderProps?: AdOrderProps
  brandModule: CrudModuleWithGetWebHref

  forumCategoryModule: CrudModuleWithGetWebHref
  // Modules
  forumModule: CrudModuleWithGetWebHref
  item?: Thread
  listingModule: CrudModuleWithGetWebHref
  relatedListingsByTag?: Listing[]
  // Related
  relatedThreads?: Thread[]

  relatedThreadsByTag?: Thread[]

  rightAside?: React.ReactNode
  // ThreadCommentFormProps
  threadCommentFormProps?: ThreadCommentFormProps
  threadCommentModule: CrudModuleWithGetWebHref

  threadComments?: ThreadComment[]

  threadModule: CrudModuleWithGetWebHref
}

const ThreadTemplate: React.FC<ThreadTemplateProps> = (props) => {
  const {
    // AdOrder
    adOrderProps,
    brandModule,
    forumCategoryModule,
    // Modules
    forumModule,
    item: thread,
    listingModule,
    relatedListingsByTag,
    // Related
    relatedThreads,
    relatedThreadsByTag,
    // ThreadCommentForm
    threadCommentFormProps,
    threadCommentModule,
    threadComments,
    threadModule,
  } = props
  const forumCategory = thread?.forum_category
  const forum = forumCategory?.forum

  useIncrementCount({
    countColumnName: 'view_count',
    item: thread,
    module: threadModule,
  })

  return (
    <div>
      <Box sx={{ pb: 4 }}>
        <Container>
          {/* Breadcrumbs */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Stack
              alignItems="center"
              direction="row"
              divider={<ArrowRightOutlinedIcon fontSize="small" />}
              spacing={1}
              verticalDividers
            >
              <Link href={forumModule.getWebHref([forum])}>
                <Typography variant="overline">{forum?.title}</Typography>
              </Link>

              <Link
                href={forumCategoryModule.getWebHref([forum, forumCategory])}
              >
                <Typography variant="overline">
                  {forumCategory?.title}
                </Typography>
              </Link>
            </Stack>
          </Box>

          {/* Body */}
          <Grid container spacing={4}>
            {/* Main */}
            <Grid item md={8}>
              {/* Title */}
              <Typography component="h1" sx={{ my: 1 }} variant="h3">
                {thread?.title}
              </Typography>

              {/* ThreadDetail */}
              <ThreadCard
                disableTitle
                forumCategoryModule={forumCategoryModule}
                isDetail
                item={thread}
                threadModule={threadModule}
              />

              {/* ThreadCommentForm */}
              {threadCommentFormProps && (
                <Box sx={{ mt: 3 }}>
                  <Typography gutterBottom variant="h5">
                    Contribute
                  </Typography>
                  <ThreadCommentForm {...threadCommentFormProps} />
                </Box>
              )}

              {/* ThreadComments */}
              {Boolean(threadComments?.length) && (
                <Box sx={{ mt: 3 }}>
                  <Typography gutterBottom variant="h5">
                    {threadComments.length} Comments
                  </Typography>

                  <Stack spacing={2}>
                    {threadComments.map((threadComment) => {
                      if (!threadComment) return null
                      return (
                        <ThreadCommentCard
                          forumCategoryModule={forumCategoryModule}
                          item={threadComment}
                          key={threadComment.id}
                          size="small"
                          threadCommentModule={threadCommentModule}
                          threadModule={threadModule}
                        />
                      )
                    })}
                  </Stack>
                </Box>
              )}
            </Grid>
            {/* Aside */}
            <Grid item md={4}>
              <Stack spacing={4}>
                {/* Related listings by tag */}
                {Boolean(relatedListingsByTag?.length) && (
                  <Box>
                    <Typography gutterBottom variant="h5">
                      Related Listings
                    </Typography>
                    <Stack spacing={1}>
                      {relatedListingsByTag.map((relatedListingByTag) => {
                        if (!relatedListingByTag) return null
                        return (
                          <ListingListItem
                            brandModule={brandModule}
                            item={relatedListingByTag}
                            key={relatedListingByTag.id}
                            listingModule={listingModule}
                            size="small"
                          />
                        )
                      })}
                    </Stack>
                  </Box>
                )}

                {/* Related threads by tag */}
                {Boolean(relatedThreadsByTag?.length) && (
                  <Box>
                    <Typography gutterBottom variant="h5">
                      Related Threads
                    </Typography>
                    <Stack spacing={1}>
                      {relatedThreadsByTag.map((relatedThreadByTag) => {
                        if (!relatedThreadByTag) return null
                        return (
                          <ThreadListItem
                            item={relatedThreadByTag}
                            key={relatedThreadByTag.id}
                            size="small"
                            threadModule={threadModule}
                          />
                        )
                      })}
                    </Stack>
                  </Box>
                )}

                {/* Ad Order */}
                {adOrderProps && <AdOrder {...adOrderProps} />}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Related Threads */}
      {Boolean(relatedThreads?.length) && (
        <Box sx={{ backgroundColor: 'background.muted', py: 4 }}>
          <Container>
            <Grid container spacing={2}>
              {relatedThreads.map((relatedThread) => {
                if (!relatedThread) return null
                return (
                  <Grid item key={relatedThread.id} md={4}>
                    <ThreadCard
                      forumCategoryModule={forumCategoryModule}
                      item={relatedThread}
                      size="small"
                      stretch
                      threadModule={threadModule}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </Container>
        </Box>
      )}
    </div>
  )
}

export default ThreadTemplate
