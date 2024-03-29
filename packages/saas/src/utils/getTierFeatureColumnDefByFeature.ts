import { Tier } from '@gravis-os/types'

/**
 * For use in columnDefs to render the feature UI in the column
 * @param featureTitle
 */
const getTierFeatureColumnDefByFeature = (featureTitle: string) => {
  return {
    field: featureTitle,
    valueGetter: ({ data }: { data: Tier }) => {
      const targetFeature = featureTitle
      const { feature_ids } = data
      if (!feature_ids?.length) return '❌'
      const feature = feature_ids.find(
        ({ title }: { title: string }) => title === targetFeature
      )
      return feature ? '✅' : '❌'
    },
  }
}

export default getTierFeatureColumnDefByFeature
