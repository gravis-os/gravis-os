import React from 'react'
import { Skeleton } from '@gravis-os/ui'
import { CrudItem, CrudModule } from '@gravis-os/types'
import PageHeader, { PageHeaderProps } from './PageHeader'
import getIsNew from './getIsNew'

const getTitlePrefix = (props: {
  isNew?: boolean
  isPreview?: boolean
  isReadOnly?: boolean
}) => {
  const { isNew, isPreview, isReadOnly } = props

  switch (true) {
    case isNew:
      return 'Add'
    case isReadOnly:
      return 'Preview'
    default:
      return 'Edit'
  }
}

export interface DetailPageHeaderProps extends PageHeaderProps {
  item?: CrudItem
  module: CrudModule
  disableTitle?: boolean
  loading?: boolean
  isPreview?: boolean
  isReadOnly?: boolean
}

const DetailPageHeader: React.FC<DetailPageHeaderProps> = (props) => {
  const {
    isReadOnly,
    isPreview,
    loading,
    disableTitle,
    item: injectedItem,
    module,
    ...rest
  } = props
  const { pk = 'title', sk = 'slug', name, route } = module

  const item = injectedItem || {}

  // isNew
  const isNew = getIsNew(item)

  // Title
  const title =
    !disableTitle &&
    `${getTitlePrefix({ isNew, isPreview, isReadOnly })} ${name.singular}`

  if (loading) return <Skeleton />

  return (
    <PageHeader
      title={title}
      breadcrumbs={[
        { key: name.plural, title: name.plural, href: route.plural },
        {
          key: name.singular,
          title: isNew ? 'New' : item[pk],
          href: `${route.plural}/${isNew ? 'new' : item[sk]}`,
        },
      ]}
      {...rest}
    />
  )
}

export default DetailPageHeader
