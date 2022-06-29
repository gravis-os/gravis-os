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
import DetailPageHeader, { DetailPageHeaderProps } from './DetailPageHeader'
import DetailBanner, { DetailBannerProps } from './DetailBanner'
import { CrudItem, CrudModule, RenderPropsFunction } from '../types'
import getIsNew from './getIsNew'
import useGetItem from './useGetItem'
import CrudForm, { CrudFormProps } from './CrudForm'

interface DetailPageRenderProps {
  item: CrudItem
  module: CrudModule
}

export interface DetailPageProps {
  bannerProps?: DetailBannerProps
  children?: React.ReactNode | RenderPropsFunction<DetailPageRenderProps>
  headerProps?: Omit<DetailPageHeaderProps, 'module'>
  module: CrudModule
  formSections?: CrudFormProps['sections']
  crudFormProps?: Partial<CrudFormProps>
  containerProps?: ContainerProps

  // Tabs
  tabs?: TabsProps['tabs']
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
    // Tabs
    tabs: injectedTabs,
    tabsProps,
    useTabsProps,
  } = props

  // Get Item
  const onUseGetItem = useGetItem({ module })
  const { item, loading } = onUseGetItem

  // renderProps for injection later
  const renderProps = { module, ...onUseGetItem }

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
  const { hasTabs, currentTab, tabs } = onUseTabs

  // Manage loading
  if (loading && !isNew) return <CircularProgress fullScreen />

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
          tabs={tabs}
          tabContentProps={renderProps}
        />
      ) : (
        childrenJsx
      )}
    </Container>
  )
}

export default DetailPage
