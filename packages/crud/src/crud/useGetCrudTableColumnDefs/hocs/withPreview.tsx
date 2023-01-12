import React from 'react'
import get from 'lodash/get'
import { Link, Stack } from '@gravis-os/ui'
import { StorageAvatar, StorageAvatarWithUpload } from '@gravis-os/storage'
import getRelationFieldKey from '../../../utils/getRelationFieldKey'

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

      const relationFieldKey = getRelationFieldKey({ field, module })

      // Show preview drawer when clicking on related item
      return {
        ...columnDef,
        cellRenderer: (params) => {
          // Methods
          const handlePreviewClick = async () => {
            const previewSlug = get(params.data, relationFieldKey)
            const previewArgs = {
              module,
              previewSlug,
              previewFormSections,
              columnDef,
            }
            setPreview(previewArgs)
          }

          // Show with avatar if avatar_src is present
          const { hasAvatar } = columnDef

          const linkProps = {
            href: disablePreview
              ? module.route?.plural?.concat(`/${params.data[module.sk]}`) ?? ''
              : null,
            onClick: disablePreview ? null : handlePreviewClick,
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
