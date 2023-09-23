import React from 'react'

import { Drawer } from '@gravis-os/ui'

import styleConfig from '../config/styleConfig'
import CrudForm from './CrudForm'
import getCrudItemHref from './getCrudItemHref'

const CrudPreviewDrawer = (props) => {
  const {
    crudFormProps,
    disableManage,
    disablePreview,
    isListPage,
    previewFormSections,
    previewItem,
    previewLoading,
    previewModule,
    refetch,
    resetPreview,
  } = props

  const isOpen =
    !disablePreview && Boolean(previewItem || (isListPage && previewLoading))

  return (
    <Drawer
      PaperProps={{
        sx: {
          boxShadow: styleConfig.rightAsideBoxShadow,
          maxWidth: styleConfig.rightAsideWidth,
          width: '100%',
        },
      }}
      anchor="right"
      onClose={resetPreview}
      // We only want to show loading state from useGetItem if CrudTable is in ListPage
      open={isOpen}
    >
      <CrudForm
        headerProps={{
          actionButtons: [
            !disableManage && {
              children: 'Manage',
              href: getCrudItemHref({
                item: previewItem,
                module: previewModule,
              }),
              key: 'manage',
            },
          ].filter(Boolean),
          borderBottom: true,
          disableBreadcrumbs: true,
          onClose: resetPreview,
          size: 'small',
          sx: { mt: 2, px: 2 },
        }}
        item={previewItem}
        loading={previewLoading}
        module={previewModule}
        sections={previewFormSections}
        {...crudFormProps}
        useCrudFormProps={{
          afterSubmit: () => {
            // Reset preview drawer state
            resetPreview()
            // Refetch outer CrudTable List Query data to refresh column values
            refetch()
          },
          ...crudFormProps?.useCrudFormProps,
        }}
      />
    </Drawer>
  )
}

export default CrudPreviewDrawer
