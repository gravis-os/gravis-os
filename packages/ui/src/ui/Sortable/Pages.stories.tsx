import React from 'react'
import faker from '@faker-js/faker'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { Pages } from './Pages'
import { Layout } from './Page'
import Card from '../Card'
import IconButton from '../IconButton'
import { createRange } from './createRange'

export default {
  title: 'ui/Sortable',
}

export const Horizontal = () => <Pages layout={Layout.Horizontal} />

export const Vertical = () => <Pages layout={Layout.Vertical} />

export const Grid = () => <Pages layout={Layout.Grid} />

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

const MOCK_ITEMS: any = createRange(20, (index) => ({
  id: `${index + 100 + 1}`,
  title: faker.commerce.productName(),
}))

export const CustomGrid = () => (
  <Pages
    layout={Layout.Grid}
    items={MOCK_ITEMS}
    renderItem={(renderProps) => <MyCard {...renderProps} />}
  />
)
