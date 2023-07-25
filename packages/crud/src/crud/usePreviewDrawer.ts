import { useState } from 'react'
import { FormSectionsProps } from '@gravis-os/form'
import { CrudItem, CrudModule } from '@gravis-os/types'
import useGetItem from './useGetItem'

export interface UsePreviewDrawerProps {
  module: CrudModule
  previewFormSections: FormSectionsProps['sections']
}

export interface UsePreviewDrawerReturn {
  previewSlug?: string
  previewModule?: CrudModule
  previewFormSections?: FormSectionsProps['sections']
  previewItem?: CrudItem
  previewLoading?: boolean
  setPreview: ({ module, previewSlug, previewFormSections }) => void
  resetPreview?: () => void
}

const usePreviewDrawer = (
  props: UsePreviewDrawerProps
): UsePreviewDrawerReturn => {
  const {
    module: injectedModule,
    previewFormSections: injectedPreviewFormSections
  } = props

  // States
  const [previewSlug, setPreviewSlug] = useState<string | null>('')
  const [previewModule, setPreviewModule] = useState<CrudModule>(injectedModule)
  const [previewFormSections, setPreviewFormSections] = useState<
    FormSectionsProps['sections']
  >(injectedPreviewFormSections)

  // Methods
  const setPreview = ({ module, previewSlug, previewFormSections }) => {
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

  // Preview item
  const onUseGetItem = useGetItem({ module: previewModule, slug: previewSlug })
  const { item: previewItem, isLoading: previewLoading } = previewSlug === ''
    ? { item: null, isLoading: false }
    : onUseGetItem

  return {
    previewSlug,
    previewModule,
    previewFormSections,

    previewItem,
    previewLoading,

    setPreview,
    resetPreview
  }
}

export default usePreviewDrawer
