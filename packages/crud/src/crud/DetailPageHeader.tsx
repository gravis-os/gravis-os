import React from 'react'

import { CrudItem, CrudModule, RenderPropsFunction } from '@gravis-os/types'
import { Skeleton } from '@gravis-os/ui'
import get from 'lodash/get'

import getIsNew from './getIsNew'
import PageHeader, { PageHeaderProps } from './PageHeader'

const getTitlePrefix = (props: {
  isNew?: boolean
  isPreview?: boolean
  isReadOnly?: boolean
}) => {
  const { isNew, isPreview, isReadOnly } = props

  switch (true) {
    case isNew: {
      return 'Add'
    }
    case isReadOnly: {
      return 'Preview'
    }
    default: {
      return 'Edit'
    }
  }
}

type RenderProps = {
  item?: Record<string, any>
  state?: { isNew?: boolean; isPreview?: boolean; isReadOnly?: boolean }
}

export interface DetailPageHeaderProps extends PageHeaderProps {
  disableSubtitle?: boolean
  disableTitle?: boolean
  isPreview?: boolean
  isReadOnly?: boolean
  item?: CrudItem
  loading?: boolean
  module: CrudModule
  renderSubtitle?: RenderPropsFunction<RenderProps>
  renderTitle?: RenderPropsFunction<RenderProps>
}

const DetailPageHeader: React.FC<DetailPageHeaderProps> = (props) => {
  const {
    disableSubtitle,
    disableTitle,
    isPreview,
    isReadOnly,
    item: injectedItem,
    loading,
    module,
    renderSubtitle,
    renderTitle,
    subtitle: injectedSubtitle,
    ...rest
  } = props
  const { name, pk = 'title', route, sk = 'slug' } = module

  const item = injectedItem || {}

  // isNew
  const isNew = getIsNew(item)

  const renderProps = {
    item: injectedItem,
    state: {
      isNew,
      isPreview,
      isReadOnly,
    },
  }

  // Title
  const title =
    !disableTitle &&
    (typeof renderTitle === 'function'
      ? renderTitle(renderProps)
      : `${getTitlePrefix({ isNew, isPreview, isReadOnly })} ${name.singular}`)

  // Subtitle
  const subtitle =
    !disableSubtitle &&
    (typeof renderSubtitle === 'function'
      ? renderSubtitle(renderProps)
      : injectedSubtitle)

  if (loading) return <Skeleton />

  return (
    <PageHeader
      breadcrumbs={[
        { title: name.plural, href: route.plural, key: name.plural },
        {
          title: isNew ? 'New' : get(item, pk),
          href: `${route.plural}/${isNew ? 'new' : get(item, sk)}`,
          key: name.singular,
        },
      ]}
      subtitle={subtitle}
      title={title}
      {...rest}
    />
  )
}

export default DetailPageHeader
