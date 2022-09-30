import React from 'react'
import {
  CircularProgress,
  Container,
  Divider,
  Tabs,
  TabContent,
  useTabs,
  TabsProps,
  UseTabsProps,
} from '@gravis-os/ui'
import { ContainerProps } from '@mui/material'
import { CrudItem, CrudModule, RenderPropsFunction } from '@gravis-os/types'
import omit from 'lodash/omit'
import DetailPageHeader, { DetailPageHeaderProps } from './DetailPageHeader'
import DetailBanner, { DetailBannerProps } from './DetailBanner'
import getIsNew from './getIsNew'
import useGetItem, { UseGetItemProps } from './useGetItem'
import CrudForm, { CrudFormProps } from './CrudForm'

interface DetailPageRenderProps {
  item: CrudItem
  module: CrudModule
}

export interface DetailPageProps {
  bannerProps?: Partial<DetailBannerProps>
  children?: React.ReactNode | RenderPropsFunction<DetailPageRenderProps>
  headerProps?: Omit<DetailPageHeaderProps, 'module'>
  module: CrudModule
  formSections?: CrudFormProps['sections']
  crudFormProps?: Partial<CrudFormProps>
  containerProps?: ContainerProps
  useGetItemProps?: UseGetItemProps

  // Tabs
  tabs?: TabsProps['items']
  tabsProps?: TabsProps
  useTabsProps?: UseTabsProps
}

const DetailPage: React.FC<DetailPageProps> = (props) => {
  const {
    module,
    children: injectedChildren,
    formSections,
    crudFormProps,
    bannerProps,
    headerProps,
    containerProps,
    useGetItemProps,
    // Tabs
    tabs: injectedTabs,
    tabsProps,
    useTabsProps,
  } = props

  // Get Item
  const onUseGetItem = useGetItem({ module, ...useGetItemProps })
  const { item, isLoading } = onUseGetItem

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
  const { hasTabs, currentTab, items: tabs } = onUseTabs

  // Manage loading
  if (!hasTabs && isLoading) return <CircularProgress fullScreen />

  return (
    <Container {...containerProps}>
      {/* If tabs exists */}
      {hasTabs && (
        <>
          {/* Breadcrumbs */}
          <DetailPageHeader
            item={item}
            module={module}
            disableTitle={!isNew}
            {...headerProps}
          />

          {/* Tabs */}
          {!isNew && (
            <>
              {/* Banner */}
              <DetailBanner item={item} module={module} {...bannerProps} />

              <Divider />

              {/* Tabs */}
              <Tabs
                tabContentProps={renderProps}
                {...onUseTabs}
                {...tabsProps}
              />
            </>
          )}
        </>
      )}

      {/* Content */}
      {hasTabs ? (
        <TabContent
          currentTab={currentTab}
          items={tabs}
          tabContentProps={renderProps}
        />
      ) : (
        childrenJsx
      )}
    </Container>
  )
}

export default DetailPage
