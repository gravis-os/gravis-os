import React from 'react'
import { Box, Container, Grid, Link, Stack, Typography } from '@gravis-os/ui'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined'
import { useIncrementCount } from '@gravis-os/query'
import ThreadCard from './ThreadCard'
import ThreadListItem from './ThreadListItem'
import { CrudModuleWithGetWebHref, Thread } from './types'
import { Listing, ListingListItem } from '../directory'

export interface ThreadTemplateProps {
  item?: Thread

  // Modules
  forumModule: CrudModuleWithGetWebHref
  forumCategoryModule: CrudModuleWithGetWebHref
  threadModule: CrudModuleWithGetWebHref
  brandModule: CrudModuleWithGetWebHref
  listingModule: CrudModuleWithGetWebHref

  rightAside?: React.ReactNode

  // Related
  relatedThreads?: Thread[]
  relatedThreadsByTag?: Thread[]
  relatedListingsByTag?: Listing[]
}

const ThreadTemplate: React.FC<ThreadTemplateProps> = (props) => {
  const {
    item: thread,

    // Modules
    forumModule,
    forumCategoryModule,
    threadModule,
    brandModule,
    listingModule,

    relatedThreads,
    relatedListingsByTag,
    relatedThreadsByTag,
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
      {/* Article */}
      <Box sx={{ pb: 4 }}>
        <Container>
          {/* Breadcrumbs */}
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

            <Link href={forumCategoryModule.getWebHref([forum, forumCategory])}>
              <Typography variant="overline">{forumCategory?.title}</Typography>
            </Link>
          </Stack>

          <Stack spacing={2}>
            {/* Body */}
            <Box>
              <Grid container spacing={4}>
                <Grid item md={9}>
                  {/* Title */}
                  <Typography variant="h1">{thread?.title}</Typography>
                  <ThreadCard
                    item={thread}
                    threadModule={threadModule}
                    forumCategoryModule={forumCategoryModule}
                    disableTitle
                    isDetail
                  />
                </Grid>

                <Grid item md={3}>
                  <Stack spacing={4}>
                    {/* Related listings by tag */}
                    {Boolean(relatedListingsByTag?.length) && (
                      <Box>
                        <Typography variant="h5" gutterBottom>
                          Related Listings
                        </Typography>
                        <Stack spacing={2}>
                          {relatedListingsByTag.map((relatedListingByTag) => {
                            if (!relatedListingByTag) return null
                            return (
                              <ListingListItem
                                key={relatedListingByTag.id}
                                item={relatedListingByTag}
                                listingModule={listingModule}
                                brandModule={brandModule}
                                cardContentProps={{ sx: { py: 0 } }}
                                disableBoxShadow
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
                        <Stack spacing={2}>
                          {relatedThreadsByTag.map((relatedThreadByTag) => {
                            if (!relatedThreadByTag) return null
                            return (
                              <ThreadListItem
                                key={relatedThreadByTag.id}
                                item={relatedThreadByTag}
                                threadModule={threadModule}
                                forumCategoryModule={forumCategoryModule}
                                size="small"
                                cardContentProps={{ sx: { py: 0 } }}
                                disableBoxShadow
                              />
                            )
                          })}
                        </Stack>
                      </Box>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Related Threads */}
      {Boolean(relatedThreads?.length) && (
        <Box sx={{ py: 4, backgroundColor: 'background.default' }}>
          <Container>
            <Grid container>
              {relatedThreads.map((relatedThread) => {
                if (!relatedThread) return null
                return (
                  <Grid item md={4} key={relatedThread.id}>
                    <ThreadCard
                      size="small"
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
