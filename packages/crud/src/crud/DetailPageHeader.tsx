import React, { ReactNode } from 'react'
import { Skeleton } from '@gravis-os/ui'
import { CrudItem, CrudModule } from '@gravis-os/types'
import get from 'lodash/get'
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

type RenderProps = {
  state?: { isNew?: boolean; isPreview?: boolean; isReadOnly?: boolean }
  item?: Record<string, any>
}
type RenderFunction = (props: RenderProps) => ReactNode

export interface DetailPageHeaderProps extends PageHeaderProps {
  item?: CrudItem
  module: CrudModule
  disableTitle?: boolean
  disableSubtitle?: boolean
  loading?: boolean
  isPreview?: boolean
  isReadOnly?: boolean
  renderTitle?: RenderFunction
  renderSubtitle?: RenderFunction
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

  const renderProps = {
    state: {
      isNew,
      isPreview,
      isReadOnly,
    },
    item: injectedItem,
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
