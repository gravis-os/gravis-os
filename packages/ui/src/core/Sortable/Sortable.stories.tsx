import React, { useState } from 'react'

import faker from '@faker-js/faker'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

import { getCoreStorybookTitle } from '../../utils/getStorybookTitle'
import Avatar from '../Avatar'
import Box from '../Box'
import Card from '../Card'
import IconButton from '../IconButton'
import { SortableLayout } from './constants'
import createRange from './createRange'
import Sortable from './Sortable'

export default {
  title: getCoreStorybookTitle(Sortable.name),
}

export const Horizontal = () => <Sortable layout={SortableLayout.Horizontal} />
export const Vertical = () => <Sortable layout={SortableLayout.Vertical} />
export const Grid = () => <Sortable layout={SortableLayout.Grid} />

const MyCard = (props) => {
  const { id, active, dragProps, item, onRemove } = props
  const { title } = item

  return (
    <>
      <Card
        disableHeaderDivider
        stretch
        title={`${id}: ${title}`}
        {...dragProps}
      />

      {!active && onRemove && (
        <IconButton className="Remove" onClick={onRemove}>
          <CancelOutlinedIcon />
        </IconButton>
      )}
    </>
  )
}

const MyAvatar = (props) => {
  const { active, dragProps, item, onRemove } = props
  const { title, src } = item
  const avatarSize = 120

  return (
    <>
      <Avatar
        alt={title}
        src={src}
        sx={{ height: avatarSize, width: avatarSize }}
        {...dragProps}
      />

      {!active && onRemove && (
        <IconButton className="Remove" onClick={onRemove}>
          <CancelOutlinedIcon />
        </IconButton>
      )}
    </>
  )
}

const MOCK_ITEMS: any = createRange(20, (index) => ({
  id: `${index + 100 + 1}`,
  title: faker.commerce.productName(),
  src: faker.image.avatar(),
}))
const initialSortKeys = MOCK_ITEMS.map(({ id }) => id)

export const CustomHorizontal = () => {
  const [sortKeys, setSortKeys] = useState(initialSortKeys)

  return (
    <>
      {JSON.stringify(sortKeys)}
      <Box
        sx={{
          '&::-webkit-scrollbar': {
            background: 'transparent',
            width: 0,
          },
          overflowX: 'scroll',
          overflowY: 'hidden',
          width: 540,
        }}
      >
        <Sortable
          items={MOCK_ITEMS}
          layout={SortableLayout.Horizontal}
          renderItem={(renderProps) => <MyAvatar {...renderProps} />}
          setSortKeys={setSortKeys}
          sortKeys={sortKeys}
          spacing={0.5}
        />
      </Box>
    </>
  )
}

export const CustomGrid = () => {
  const [sortKeys, setSortKeys] = useState(initialSortKeys)

  return (
    <>
      {JSON.stringify(sortKeys)}
      <Sortable
        items={MOCK_ITEMS}
        layout={SortableLayout.Grid}
        renderItem={(renderProps) => <MyCard {...renderProps} />}
        setSortKeys={setSortKeys}
        sortKeys={sortKeys}
      />
    </>
  )
}
