import React from 'react'

import { FormSectionsProps } from '@gravis-os/form'
import { StorageAvatar } from '@gravis-os/storage'
import { CrudModule } from '@gravis-os/types'
import { Link, Stack } from '@gravis-os/ui'
import { ICellRendererParams } from 'ag-grid-community'
import get from 'lodash/get'

import getRelationFieldKey from '../../../utils/getRelationFieldKey'
import { UsePreviewDrawerReturn } from '../../usePreviewDrawer'

export const handlePreview = ({
  module,
  params,
  previewFormSections,
  setPreview,
}: {
  module: CrudModule
  params: ICellRendererParams
  previewFormSections: FormSectionsProps['sections']
  setPreview: UsePreviewDrawerReturn['setPreview']
}) => {
  const { colDef, data } = params
  const { field } = colDef
  const relationFieldKey = getRelationFieldKey({ field, module })

  const previewSlug: string = get(data, relationFieldKey)
  const previewArgs = {
    module,
    previewFormSections,
    previewSlug,
  }
  setPreview?.(previewArgs)
}

const withPreview = (props) => {
  const {
    disablePreview,
    module: injectedModule,
    previewFormSections: injectedPreviewFormSections,
    setPreview,
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
            color: 'inherit',
            href: disablePreview
              ? module.route?.plural?.concat(`/${params.data[module.sk]}`) ?? ''
              : null,
            onClick: disablePreview
              ? null
              : () =>
                  handlePreview({
                    module,
                    params,
                    previewFormSections,
                    setPreview,
                  }),
            pointer: true,
            underline: 'hover' as const,
          }

          return (
            <Stack alignItems="center" direction="row" spacing={1}>
              {hasAvatar && params.data && (
                <StorageAvatar
                  alt={params.data.avatar_alt || params.data.title}
                  size={32}
                  src={params.data.avatar_src}
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
