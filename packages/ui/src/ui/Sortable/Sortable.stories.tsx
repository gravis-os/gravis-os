import React, { useState } from 'react'
import faker from '@faker-js/faker'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import Sortable from './Sortable'
import { Layout } from './constants'
import Box from '../Box'
import Card from '../Card'
import Avatar from '../Avatar'
import IconButton from '../IconButton'
import createRange from './createRange'

export default {
  title: 'ui/Sortable',
}

export const Horizontal = () => <Sortable layout={Layout.Horizontal} />
export const Vertical = () => <Sortable layout={Layout.Vertical} />
export const Grid = () => <Sortable layout={Layout.Grid} />

const MyCard = (props) => {
  const { id, active, onRemove, item, dragProps } = props
  const { title } = item

  return (
    <>
      <Card
        stretch
        disableHeaderDivider
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
  const { active, onRemove, item, dragProps } = props
  const { title, src } = item
  const avatarSize = 120

  return (
    <>
      <Avatar
        sx={{ width: avatarSize, height: avatarSize }}
        src={src}
        alt={title}
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
          width: 540,
          overflowY: 'hidden',
          overflowX: 'scroll',
          '&::-webkit-scrollbar': {
            width: 0,
            background: 'transparent',
          },
        }}
      >
        <Sortable
          spacing={0.5}
          sortKeys={sortKeys}
          setSortKeys={setSortKeys}
          layout={Layout.Horizontal}
          items={MOCK_ITEMS}
          renderItem={(renderProps) => <MyAvatar {...renderProps} />}
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
        sortKeys={sortKeys}
        setSortKeys={setSortKeys}
        layout={Layout.Grid}
        items={MOCK_ITEMS}
        renderItem={(renderProps) => <MyCard {...renderProps} />}
      />
    </>
  )
}
