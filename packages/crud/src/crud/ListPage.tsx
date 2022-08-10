import React from 'react'
import { Container, ContainerProps } from '@gravis-os/ui'
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
    <Container maxWidth="xl" {...containerProps}>
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
