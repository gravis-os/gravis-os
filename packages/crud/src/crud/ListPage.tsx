import React, { useEffect, useState } from 'react'
import {
  Container,
  ContainerProps,
  Tabs,
  useTabs,
  TabsProps,
  UseTabsProps,
} from '@gravis-os/ui'
import { FormSectionsProps } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import PageHeader from './PageHeader'
import CrudTable, { CrudTableProps } from './CrudTable'

export interface ListPageProps {
  module: CrudModule
  columnDefs?: CrudTableProps['columnDefs']
  filterFormSections?: FormSectionsProps['sections']
  searchFormSections?: FormSectionsProps['sections']
  previewFormSections?: FormSectionsProps['sections']
  addFormSections?: FormSectionsProps['sections']
  crudTableProps?: Partial<CrudTableProps>
  containerProps?: ContainerProps

  // Tabs
  tabs?: TabsProps['items']
  tabsProps?: TabsProps
  useTabsProps?: UseTabsProps
}

const ListPage: React.FC<ListPageProps> = (props) => {
  const {
    crudTableProps,
    searchFormSections: injectedSearchFormSections,
    filterFormSections,
    previewFormSections,
    addFormSections,
    columnDefs,
    module,
    containerProps,

    // Tabs
    tabs: injectedTabs,
    tabsProps,
    useTabsProps,
  } = props
  const { name, route } = module

  // Page Header
  const pageHeaderProps = {
    title: name.plural,
    breadcrumbs: [{ key: name.plural, title: name.plural, href: route.plural }],
  }

  // Search
  const searchFormSections = injectedSearchFormSections || [
    {
      key: 'general',
      fields: [{ key: 'title', name: 'title', type: 'input', op: 'ilike' }],
    },
  ]

  // ==============================
  // Tabs
  // ==============================
  const onUseTabs = useTabs({ tabs: injectedTabs, ...useTabsProps })
  const { hasTabs, currentTab, items: tabs } = onUseTabs
  const [filter, setFilter] = useState('')

  useEffect(() => {
    setFilter(currentTab)
  }, [currentTab])

  const actionJsx = (
    <Tabs
      {...onUseTabs}
      {...tabsProps}
      currentTab={currentTab}
    />
  )

  return (
    <Container maxWidth="xl" {...containerProps}>
      <PageHeader {...pageHeaderProps} />
      <CrudTable
        isListPage
        columnDefs={columnDefs}
        actions={actionJsx}
        module={module}
        addFormSections={addFormSections}
        previewFormSections={previewFormSections}
        filterFormSections={filterFormSections}
        searchFormSections={searchFormSections}
        {...crudTableProps}
        filters={{
          status: currentTab,
          ...crudTableProps?.filters,
        }}
      />
    </Container>
  )
}

export default ListPage
