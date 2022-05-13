import { useState } from 'react'
import { FormSectionsProps } from '@gravis-os/form'
import { CrudModule } from './typings'
import useGetItem from './useGetItem'

const usePreviewDrawer = props => {
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
    setPreviewFormSections(previewFormSections)
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
