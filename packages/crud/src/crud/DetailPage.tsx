import React, { useState } from 'react'
import {
  Container,
  Tabs,
  TabsProps,
  Tab,
  TabProps,
  Card,
  CardProps,
  Divider,
  CircularProgress,
} from '@gravis-os/ui'
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

type HiddenFunction = ({ item }: DetailPageRenderProps) => boolean

interface DetailTab extends Omit<TabProps, 'children' | 'hidden'> {
  children?: React.ReactElement
  render?: ({ item }: DetailPageRenderProps) => React.ReactElement
  hidden?: boolean | HiddenFunction
}

export interface DetailPageProps {
  bannerProps?: DetailBannerProps
  children?: React.ReactNode | RenderPropsFunction<DetailPageRenderProps>
  headerProps?: Omit<DetailPageHeaderProps, 'module'>
  module: CrudModule
  tabs?: DetailTab[]
  tabsProps?: TabsProps
  tabsCardProps?: CardProps
  formSections?: CrudFormProps['sections']
  crudFormProps?: Partial<CrudFormProps>
}

const DetailPage: React.FC<DetailPageProps> = (props) => {
  const {
    module,
    children: injectedChildren,
    formSections,
    crudFormProps,
    tabs,
    tabsProps,
    tabsCardProps,
    bannerProps,
    headerProps,
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

  // ==============================
  // Tabs
  // ==============================
  const hasTabs = tabs && tabs?.length > 0
  const defaultCurrentTab = hasTabs ? tabs[0].value : undefined
  const [currentTab, setCurrentTab] = useState<string | undefined>(
    defaultCurrentTab
  )
  const handleTabsChange = (e, value) => setCurrentTab(value)
  const renderTabs = () => (
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
          <Card
            square
            sx={{ mb: 3, ...tabsCardProps?.sx }}
            contentProps={{
              sx: {
                '&&': { py: 0 },
                px: 2,
                ...tabsCardProps?.contentProps?.sx,
              },
              ...tabsCardProps?.contentProps,
            }}
            {...tabsCardProps}
          >
            <Tabs
              onChange={handleTabsChange}
              scrollButtons="auto"
              value={currentTab}
              variant="scrollable"
              {...tabsProps}
            >
              {hasTabs &&
                tabs.map((tab) => {
                  const { hidden } = tab

                  // Hidden
                  const hasHidden =
                    typeof hidden === 'function' || typeof hidden === 'boolean'
                  if (hasHidden) {
                    const shouldHide =
                      typeof hidden === 'function'
                        ? hidden(renderProps)
                        : hidden
                    if (shouldHide) return
                  }

                  return (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  )
                })}
            </Tabs>
          </Card>
        </>
      )}
    </>
  )
  const renderTab = (currentTab) => {
    if (!hasTabs) return

    const currentTabItem = (tabs as any[]).find(
      ({ value }) => value === currentTab
    )
    const tabChildrenJsx = currentTabItem.children

    const hasRender = Boolean(currentTabItem.render)

    switch (true) {
      case hasRender:
        return currentTabItem.render(renderProps)
      case React.isValidElement(tabChildrenJsx):
        return React.cloneElement(tabChildrenJsx, renderProps)
      default:
        return tabChildrenJsx
    }
  }
  // Add fragment + key to reconcile react tree
  const tabsChildrenJsx = (
    <React.Fragment key={currentTab}>{renderTab(currentTab)}</React.Fragment>
  )
  const childrenJsx =
    typeof children === 'function' ? children(renderProps) : children

  if (loading && !isNew) return <CircularProgress fullScreen />

  return (
    <Container>
      {hasTabs && renderTabs()}
      {hasTabs ? tabsChildrenJsx : childrenJsx}
    </Container>
  )
}

export default DetailPage
