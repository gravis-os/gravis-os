import { useState } from 'react'
import { FormSectionsProps } from '@gravis-os/form'
import { CrudModule } from './typings'
import useGetItem from './useGetItem'

const usePreviewDrawer = (props) => {
  const {
    module: injectedModule,
    previewFormSections: injectedPreviewFormSections,
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
  const { item: previewItem, loading: previewLoading } = onUseGetItem

  return {
    previewSlug,
    previewModule,
    previewFormSections,

    previewItem,
    previewLoading,

    setPreview,
    resetPreview,
  }
}

export default usePreviewDrawer
