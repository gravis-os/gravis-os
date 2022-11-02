import React from 'react'
import { Box, Container, Grid, Link, Stack, Typography } from '@gravis-os/ui'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined'
import { useIncrementCount } from '@gravis-os/query'
import { CrudModule } from '@gravis-os/types'
import ThreadCard from './ThreadCard'
import ThreadListItem from './ThreadListItem'
import ThreadCommentCard from './ThreadCommentCard'
import { CrudModuleWithGetWebHref, Thread, ThreadComment } from './types'
import { Listing, ListingListItem } from '../directory'
import { AdOrder, AdOrderProps } from '../ads'

export interface ThreadTemplateProps {
  item?: Thread
  threadComments?: ThreadComment[]

  // Modules
  forumModule: CrudModuleWithGetWebHref
  forumCategoryModule: CrudModuleWithGetWebHref
  threadModule: CrudModuleWithGetWebHref
  threadCommentModule: CrudModule
  brandModule: CrudModuleWithGetWebHref
  listingModule: CrudModuleWithGetWebHref

  rightAside?: React.ReactNode

  // Related
  relatedThreads?: Thread[]
  relatedThreadsByTag?: Thread[]
  relatedListingsByTag?: Listing[]

  // AdOrderProps
  adOrderProps?: AdOrderProps
}

const ThreadTemplate: React.FC<ThreadTemplateProps> = (props) => {
  const {
    item: thread,
    threadComments,
    // Modules
    forumModule,
    forumCategoryModule,
    threadModule,
    threadCommentModule,
    brandModule,
    listingModule,
    // Related
    relatedThreads,
    relatedListingsByTag,
    relatedThreadsByTag,
    // AdOrder
    adOrderProps,
  } = props
  const forumCategory = thread?.forum_category
  const forum = forumCategory?.forum

  useIncrementCount({
    item: thread,
    module: threadModule,
    countColumnName: 'view_count',
  })

  return (
    <div>
      <Box sx={{ pb: 4 }}>
        <Container>
          {/* Breadcrumbs */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              verticalDividers
              divider={<ArrowRightOutlinedIcon fontSize="small" />}
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
              <Typography variant="h3" component="h1" sx={{ my: 1 }}>
                {thread?.title}
              </Typography>
              <ThreadCard
                item={thread}
                threadModule={threadModule}
                forumCategoryModule={forumCategoryModule}
                disableTitle
                isDetail
              />

              {/* ThreadComments */}
              {Boolean(threadComments?.length) && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    {threadComments.length} Comments
                  </Typography>

                  <Stack spacing={2}>
                    {threadComments.map((threadComment) => {
                      if (!threadComment) return null
                      return (
                        <ThreadCommentCard
                          size="small"
                          key={threadComment.id}
                          item={threadComment}
                          threadModule={threadModule}
                          threadCommentModule={threadCommentModule}
                          forumCategoryModule={forumCategoryModule}
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
                    <Typography variant="h5" gutterBottom>
                      Related Listings
                    </Typography>
                    <Stack spacing={1}>
                      {relatedListingsByTag.map((relatedListingByTag) => {
                        if (!relatedListingByTag) return null
                        return (
                          <ListingListItem
                            size="small"
                            key={relatedListingByTag.id}
                            item={relatedListingByTag}
                            listingModule={listingModule}
                            brandModule={brandModule}
                          />
                        )
                      })}
                    </Stack>
                  </Box>
                )}

                {/* Related threads by tag */}
                {Boolean(relatedThreadsByTag?.length) && (
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      Related Threads
                    </Typography>
                    <Stack spacing={1}>
                      {relatedThreadsByTag.map((relatedThreadByTag) => {
                        if (!relatedThreadByTag) return null
                        return (
                          <ThreadListItem
                            size="small"
                            key={relatedThreadByTag.id}
                            item={relatedThreadByTag}
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
        <Box sx={{ py: 4, backgroundColor: 'background.muted' }}>
          <Container>
            <Grid container spacing={2}>
              {relatedThreads.map((relatedThread) => {
                if (!relatedThread) return null
                return (
                  <Grid item md={4} key={relatedThread.id}>
                    <ThreadCard
                      size="small"
                      stretch
                      item={relatedThread}
                      threadModule={threadModule}
                      forumCategoryModule={forumCategoryModule}
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
