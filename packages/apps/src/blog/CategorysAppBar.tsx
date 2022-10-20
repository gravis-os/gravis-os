import React from 'react'
import { Box, Stack, Link, Typography } from '@gravis-os/ui'
import { CrudItem } from '@gravis-os/types'

export interface CategorysAppBarProps {
  items: CrudItem[]
  getHref: (item: Record<string, any>) => string
  size?: 'small' | 'medium'
}

const CategorysAppBar: React.FC<CategorysAppBarProps> = (props) => {
  const { size = 'medium', items, getHref } = props

  if (!items?.length) return null

  const isSmall = size === 'small'

  return (
    <div>
      <Stack
        verticalDividers
        spacing={isSmall ? 2 : 3}
        direction="row"
        sx={{
          overflowX: 'scroll',
          '&::-webkit-scrollbar': { width: 0, height: 0 },
        }}
      >
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
    </div>
  )
}

export default CategorysAppBar