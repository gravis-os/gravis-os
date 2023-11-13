import { useState } from 'react'

import { FormSectionsProps } from '@gravis-os/form'
import { CrudItem, CrudModule } from '@gravis-os/types'

import useCrud from './useCrud'
import useGetItem from './useGetItem'

export interface UsePreviewDrawerProps {
  module: CrudModule
  previewFormSections: FormSectionsProps['sections']
}

export interface UsePreviewDrawerReturn {
  previewFormSections?: FormSectionsProps['sections']
  previewItem?: CrudItem
  previewLoading?: boolean
  previewModule?: CrudModule
  previewSlug?: string
  resetPreview?: () => void
  setPreview: ({ module, previewFormSections, previewSlug }) => void
}

const usePreviewDrawer = (
  props: UsePreviewDrawerProps
): UsePreviewDrawerReturn => {
  const {
    module: injectedModule,
    previewFormSections: injectedPreviewFormSections,
  } = props

  // States
  const [previewSlug, setPreviewSlug] = useState<null | string>('')
  const [previewModule, setPreviewModule] = useState<CrudModule>(injectedModule)
  const [previewFormSections, setPreviewFormSections] = useState<
    FormSectionsProps['sections']
  >(injectedPreviewFormSections)

  // Methods
  const setPreview = ({ module, previewFormSections, previewSlug }) => {
    setPreviewModule(module)
    setPreviewSlug(previewSlug)
    /**
     * previewFormSections may be undefined, so we need to check for it
     * and fallback to the injectedPreviewFormSections. This case usually happens
     * when the PreviewDrawer is opened from the isFirst column of the table
     */
    const nextPreviewFormSections =
      previewFormSections || injectedPreviewFormSections
    setPreviewFormSections(nextPreviewFormSections)
  }
  const resetPreview = () => setPreviewSlug('')

  const { crudQueryOptions } = useCrud()

  // Preview item
  const onUseGetItem = useGetItem({
    slug: previewSlug,
    module: previewModule,
    options: crudQueryOptions,
  })
  const { isLoading: previewLoading, item: previewItem } =
    previewSlug === '' ? { isLoading: false, item: null } : onUseGetItem

  return {
    previewFormSections,
    previewItem,
    previewLoading,

    previewModule,
    previewSlug,

    resetPreview,
    setPreview,
  }
}

export default usePreviewDrawer
