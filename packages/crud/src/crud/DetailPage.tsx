import React from 'react'

import { CrudItem, CrudModule, RenderPropsFunction } from '@gravis-os/types'
import {
  CircularProgress,
  Container,
  Divider,
  TabContent,
  Tabs,
  TabsProps,
  UseTabsProps,
  useTabs,
} from '@gravis-os/ui'
import { ContainerProps } from '@mui/material'
import omit from 'lodash/omit'

import CrudForm, { CrudFormProps } from './CrudForm'
import DetailBanner, { DetailBannerProps } from './DetailBanner'
import DetailPageHeader, { DetailPageHeaderProps } from './DetailPageHeader'
import getIsNew from './getIsNew'
import useCrud from './useCrud'
import useGetItem, { UseGetItemProps } from './useGetItem'

interface DetailPageRenderProps {
  item: CrudItem
  module: CrudModule
}

export interface DetailPageProps {
  bannerProps?: Partial<DetailBannerProps>
  children?: React.ReactNode | RenderPropsFunction<DetailPageRenderProps>
  containerProps?: ContainerProps
  crudFormProps?: Partial<CrudFormProps>
  disableBanner?: boolean
  disableHeader?: boolean
  formSections?: CrudFormProps['sections']
  headerProps?: Omit<DetailPageHeaderProps, 'module'>

  module: CrudModule
  // Tabs
  tabs?: TabsProps['items']
  tabsProps?: TabsProps

  useGetItemProps?: UseGetItemProps
  useTabsProps?: UseTabsProps
}

const DetailPage: React.FC<DetailPageProps> = (props) => {
  const {
    bannerProps,
    children: injectedChildren,
    containerProps,
    crudFormProps,
    disableBanner,
    disableHeader,
    formSections,
    headerProps,
    module,
    // Tabs
    tabs: injectedTabs,
    tabsProps,

    useGetItemProps,
    useTabsProps,
  } = props

  // Get Item
  const { crudQueryOptions } = useCrud()
  const onUseGetItem = useGetItem({
    module,
    options: crudQueryOptions,
    ...useGetItemProps,
  })
  const { isLoading, item } = onUseGetItem

  // renderProps for injection later
  const renderProps = { module, ...omit(onUseGetItem, 'refetch') }

  // Detail page shorthand with CrudForm
  const children = formSections ? (
    <CrudForm
      {...renderProps}
      sections={formSections}
      {...crudFormProps}
      headerProps={headerProps}
    />
  ) : (
    injectedChildren
  )

  // isNew
  const isNew = getIsNew(item)

  // Children
  const childrenJsx =
    typeof children === 'function' ? children(renderProps) : children

  // ==============================
  // Tabs
  // ==============================
  const onUseTabs = useTabs({ tabs: injectedTabs, ...useTabsProps })
  const { currentTab, hasTabs, items: tabs } = onUseTabs

  // Manage loading
  if (!hasTabs && isLoading) return <CircularProgress fullScreen />

  return (
    <Container {...containerProps}>
      {/* If tabs exists */}
      {hasTabs && (
        <>
          {/* Breadcrumbs */}
          {!disableHeader && (
            <DetailPageHeader
              disableTitle={!isNew}
              item={item}
              module={module}
              {...headerProps}
            />
          )}

          {/* Tabs */}
          {!isNew && (
            <>
              {/* Banner */}
              {!disableBanner && (
                <>
                  <DetailBanner item={item} module={module} {...bannerProps} />

                  <Divider />
                </>
              )}

              {/* Tabs */}
              <Tabs renderProps={renderProps} {...onUseTabs} {...tabsProps} />
            </>
          )}
        </>
      )}

      {/* Content */}
      {hasTabs ? (
        <TabContent
          currentTab={currentTab}
          items={tabs}
          renderProps={renderProps}
        />
      ) : (
        childrenJsx
      )}
    </Container>
  )
}

export default DetailPage
