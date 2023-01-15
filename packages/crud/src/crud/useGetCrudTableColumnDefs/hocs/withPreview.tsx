import React from 'react'
import get from 'lodash/get'
import { Link, Stack } from '@gravis-os/ui'
import { StorageAvatar, StorageAvatarWithUpload } from '@gravis-os/storage'
import { FormSectionsProps } from '@gravis-os/form'
import { ICellRendererParams } from 'ag-grid-community'
import { CrudModule } from '@gravis-os/types'
import { UsePreviewDrawerReturn } from '../../usePreviewDrawer'
import getRelationFieldKey from '../../../utils/getRelationFieldKey'

export const handlePreview = ({
  module,
  previewFormSections,
  setPreview,
  params,
}: {
  module: CrudModule
  previewFormSections: FormSectionsProps['sections']
  setPreview: UsePreviewDrawerReturn['setPreview']
  params: ICellRendererParams
}) => {
  const { colDef, data } = params
  const { field } = colDef
  const relationFieldKey = getRelationFieldKey({ field, module })

  const previewSlug: string = get(data, relationFieldKey)
  const previewArgs = {
    module,
    previewSlug,
    previewFormSections,
  }
  setPreview?.(previewArgs)
}

const withPreview = (props) => {
  const {
    setPreview,
    module: injectedModule,
    previewFormSections: injectedPreviewFormSections,
    disablePreview,
  } = props
  return (columnDefs) => {
    return columnDefs.map((columnDef, i) => {
      const { field, previewFormSections } = columnDef

      // Always set first column as preview column
      const isFirst = i === 0
      const module = isFirst ? injectedModule : columnDef.module
      const hasPreview =
        !disablePreview && (isFirst || (module && previewFormSections))

      // Handle degenerate case
      if (!hasPreview) return columnDef

      // Show preview drawer when clicking on related item
      return {
        ...columnDef,
        cellRenderer: (params) => {
          // Show with avatar if avatar_src is present
          const { hasAvatar } = columnDef

          const linkProps = {
            href: disablePreview
              ? module.route?.plural?.concat(`/${params.data[module.sk]}`) ?? ''
              : null,
            onClick: disablePreview
              ? null
              : () =>
                  handlePreview({
                    module,
                    previewFormSections,
                    setPreview,
                    params,
                  }),
            underline: 'hover' as const,
            color: 'inherit',
            pointer: true,
          }

          return (
            <Stack direction="row" alignItems="center" spacing={1}>
              {hasAvatar && (
                <StorageAvatar
                  src={params.data.avatar_src}
                  alt={params.data.avatar_alt || params.data.title}
                  size={32}
                />
              )}
              <Link {...linkProps}>{params.value}</Link>
            </Stack>
          )
        },
      }
    })
  }
}

export default withPreview
