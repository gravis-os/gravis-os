import React from 'react'
import { Skeleton } from '@gravis-os/ui'
import { CrudItem, CrudModule } from '@gravis-os/types'
import { get } from 'lodash'
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
  disableSubtitle?: boolean
  loading?: boolean
  isPreview?: boolean
  isReadOnly?: boolean
  renderTitle?: (args: {
    state?: { isNew?: boolean; isPreview?: boolean; isReadOnly?: boolean }
    item?: Record<string, any>
  }) => string | React.ReactElement
  renderSubtitle?: (args: {
    state?: { isNew?: boolean; isPreview?: boolean; isReadOnly?: boolean }
    item?: Record<string, any>
  }) => string | React.ReactElement
}

const DetailPageHeader: React.FC<DetailPageHeaderProps> = (props) => {
  const {
    isReadOnly,
    isPreview,
    loading,
    disableTitle,
    disableSubtitle,
    item: injectedItem,
    module,
    renderTitle,
    renderSubtitle,
    subtitle: injectedSubtitle,
    ...rest
  } = props
  const { pk = 'title', sk = 'slug', name, route } = module

  const item = injectedItem || {}

  // isNew
  const isNew = getIsNew(item)

  // Title
  const title =
    !disableTitle &&
    (typeof renderTitle === 'function'
      ? renderTitle({
          state: {
            isNew,
            isPreview,
            isReadOnly,
          },
          item: injectedItem,
        })
      : `${getTitlePrefix({ isNew, isPreview, isReadOnly })} ${name.singular}`)

  // Subtitle
  const subtitle =
    !disableSubtitle &&
    (typeof renderSubtitle === 'function'
      ? renderSubtitle({
          state: {
            isNew,
            isPreview,
            isReadOnly,
          },
          item: injectedItem,
        })
      : injectedSubtitle)

  if (loading) return <Skeleton />

  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      breadcrumbs={[
        { key: name.plural, title: name.plural, href: route.plural },
        {
          key: name.singular,
          title: isNew ? 'New' : get(item, pk),
          href: `${route.plural}/${isNew ? 'new' : get(item, sk)}`,
        },
      ]}
      {...rest}
    />
  )
}

export default DetailPageHeader
