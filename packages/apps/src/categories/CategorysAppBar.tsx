import React from 'react'
import { Box, Stack, Link, Typography } from '@gravis-os/ui'
import { CrudItem } from '@gravis-os/types'

export interface CategorysAppBarProps {
  items: CrudItem[]
  getHref: (item: Record<string, any>) => string
  size?: 'small' | 'medium'
  title?: React.ReactNode
}

const CategorysAppBar: React.FC<CategorysAppBarProps> = (props) => {
  const { title, size = 'medium', items, getHref } = props

  if (!items?.length) return null

  const isSmall = size === 'small'

  return (
    <Stack
      verticalDividers
      spacing={isSmall ? 2 : 3}
      direction="row"
      alignItems="center"
      sx={{
        overflowX: 'scroll',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {title}
      {items?.map((item) => {
        if (!item) return null
        return (
          <Box key={item.id}>
            <Link href={getHref(item)}>
              <Typography variant={isSmall ? 'overline' : 'h4'}>
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
