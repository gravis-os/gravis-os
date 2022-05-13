import React from 'react'
import { Container } from '@gravis-os/ui'
import { FormSectionsProps } from '@gravis-os/form'
import PageHeader from './PageHeader'
import { DataTableProps } from './DataTable'
import { CrudModule } from './typings'
import CrudTable, { CrudTableProps } from './CrudTable'

export interface ListPageProps {
  module: CrudModule
  columnDefs?: DataTableProps['columnDefs']
  filterFormSections?: FormSectionsProps['sections']
  searchFormSections?: FormSectionsProps['sections']
  previewFormSections?: FormSectionsProps['sections']
  addFormSections?: FormSectionsProps['sections']
  crudTableProps?: CrudTableProps
}

const ListPage: React.FC<ListPageProps> = props => {
  const {
    crudTableProps,
    searchFormSections: injectedSearchFormSections,
    filterFormSections,
    previewFormSections,
    addFormSections,
    columnDefs,
    module,
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

  return (
    <Container>
      <PageHeader {...pageHeaderProps} />

      <CrudTable
        isListPage
        columnDefs={columnDefs}
        module={module}
        addFormSections={addFormSections}
        previewFormSections={previewFormSections}
        filterFormSections={filterFormSections}
        searchFormSections={searchFormSections}
        {...crudTableProps}
      />
    </Container>
  )
}

export default ListPage
