import React from 'react'
import PageHeader, { PageHeaderProps } from './PageHeader'
import { Skeleton } from '@gravis-os/ui'
import { CrudItem, CrudModule } from './typings'
import getIsNew from './getIsNew'

export interface DetailPageHeaderProps extends PageHeaderProps {
  item?: CrudItem
  module: CrudModule
  disableTitle?: boolean
  loading?: boolean
}

const DetailPageHeader: React.FC<DetailPageHeaderProps> = (props) => {
  const { loading, disableTitle, item: injectedItem, module, ...rest } = props
  const { pk = 'title', sk = 'slug', name, route } = module

  const item = injectedItem || {}

  // isNew
  const isNew = getIsNew(item)

  // Page Header
  const pageHeaderProps = {
    breadcrumbs: [
      { key: name.plural, title: name.plural, href: route.plural },
      { key: name.singular, title: isNew ? 'New' : item[pk], href: `${route.plural}/${isNew ? 'new' : item[sk]}` },
    ],
    title: !disableTitle && `${isNew ? 'Add' : 'Edit'} ${name.singular}`,
    ...rest,
  }

  if (loading) return <Skeleton />

  return <PageHeader {...pageHeaderProps} />
}

export default DetailPageHeader
