import React from 'react'
import { Drawer } from '@gravis-os/ui'
import styleConfig from '../config/styleConfig'
import CrudForm from './CrudForm'
import getCrudItemHref from './getCrudItemHref'

const CrudPreviewDrawer = (props) => {
  const {
    disableManage,
    isListPage,
    refetch,
    previewModule,
    previewItem,
    resetPreview,
    previewFormSections,
    previewLoading,
    crudFormProps,
  } = props

  return (
    <Drawer
      anchor="right"
      // We only want to show loading state from useGetItem if CrudTable is in ListPage
      open={Boolean(previewItem || (isListPage && previewLoading))}
      onClose={resetPreview}
      PaperProps={{
        sx: { width: '100%', maxWidth: styleConfig.rightAsideWidth },
      }}
    >
      <CrudForm
        loading={previewLoading}
        module={previewModule}
        sections={previewFormSections}
        item={previewItem}
        headerProps={{
          sx: { mt: 2, px: 2 },
          disableBreadcrumbs: true,
          onClose: resetPreview,
          borderBottom: true,
          size: 'small',
          actionButtons: [
            !disableManage && {
              key: 'manage',
              children: 'Manage',
              href: getCrudItemHref({
                module: previewModule,
                item: previewItem,
              }),
            },
          ].filter(Boolean),
        }}
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
