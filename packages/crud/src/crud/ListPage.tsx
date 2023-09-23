import React from 'react'

import { FormSectionsProps } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import { Container, ContainerProps } from '@gravis-os/ui'

import CrudTable, { CrudTableProps } from './CrudTable'
import PageHeader from './PageHeader'

export interface ListPageProps {
  addFormSections?: FormSectionsProps['sections']
  columnDefs?: CrudTableProps['columnDefs']
  containerProps?: ContainerProps
  crudTableProps?: Partial<CrudTableProps>
  disableHeader?: boolean
  filterFormSections?: FormSectionsProps['sections']
  module: CrudModule
  previewFormSections?: FormSectionsProps['sections']
  rightTitle?: React.ReactNode
  searchFormSections?: FormSectionsProps['sections']
}

const ListPage: React.FC<ListPageProps> = (props) => {
  const {
    addFormSections,
    columnDefs,
    containerProps,
    crudTableProps,
    disableHeader,
    filterFormSections,
    module,
    previewFormSections,
    rightTitle,
    searchFormSections: injectedSearchFormSections,
  } = props
  const { name, route } = module

  // Page Header
  const pageHeaderProps = {
    title: name.plural,
    breadcrumbs: [{ title: name.plural, href: route.plural, key: name.plural }],
    rightTitle,
  }

  // Search
  const searchFormSections = injectedSearchFormSections || [
    {
      fields: [{ key: 'title', name: 'title', op: 'ilike', type: 'input' }],
      key: 'general',
    },
  ]

  return (
    <Container maxWidth="xl" {...containerProps}>
      {!disableHeader && <PageHeader {...pageHeaderProps} />}
      <CrudTable
        addFormSections={addFormSections}
        columnDefs={columnDefs}
        filterFormSections={filterFormSections}
        isListPage
        module={module}
        previewFormSections={previewFormSections}
        searchFormSections={searchFormSections}
        {...crudTableProps}
      />
    </Container>
  )
}

export default ListPage
