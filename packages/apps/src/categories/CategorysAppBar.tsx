import React from 'react'

import { CrudItem } from '@gravis-os/types'
import { Box, Link, Stack, Typography } from '@gravis-os/ui'

export interface CategorysAppBarProps {
  getHref: (item: Record<string, any>) => string
  items: CrudItem[]
  size?: 'medium' | 'small'
  title?: React.ReactNode
}

const CategorysAppBar: React.FC<CategorysAppBarProps> = (props) => {
  const { title, getHref, items, size = 'medium' } = props

  if (!items?.length) return null

  const isSmall = size === 'small'

  return (
    <Stack
      alignItems="center"
      direction="row"
      spacing={isSmall ? 2 : 3}
      sx={{
        '&::-webkit-scrollbar': { display: 'none' },
        overflowX: 'scroll',
      }}
      verticalDividers
    >
      {title}
      {items?.map((item) => {
        if (!item) return null
        return (
          <Box key={item.id}>
            <Link href={getHref(item)}>
              <Typography variant={isSmall ? 'overline' : 'h6'}>
                {item.title}
              </Typography>
            </Link>
            <Typography>{item.subtitle}</Typography>
          </Box>
        )
      })}
    </Stack>
  )
}

export default CategorysAppBar
