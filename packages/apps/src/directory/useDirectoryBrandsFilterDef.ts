import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useQuery } from 'react-query'
import type { FilterDef } from '@gravis-os/query'

export interface useDirectoryBrandsFilterDefProps {
  directory_id?: number
}

const useDirectoryBrandsFilterDef = (
  props: useDirectoryBrandsFilterDefProps
) => {
  const { directory_id } = props

  // Fetch brands with listings from this directory
  const fetchBrandsWithListingsFromDirectory = async () => {
    return supabaseClient
      .from('brand')
      .select(
        '*, listing!inner(directory_category!inner(id, directory!inner(id)))'
      )
      .filter('listing.directory_category.directory.id', 'eq', directory_id)
  }
  const fetchedBrands = useQuery(
    ['fetch-brands-with-listings-from-directory', directory_id],
    fetchBrandsWithListingsFromDirectory,
    { enabled: Boolean(directory_id) }
  )
  const getBrandFilterDef = (brands): FilterDef => {
    if (!brands?.length) return
    return {
      key: 'brands',
      label: 'Brands',
      name: 'brand_id',
      op: 'in',
      options: brands.map((brand) => ({
        key: brand.id,
        value: brand.id,
        label: brand.title,
      })),
    }
  }
  const brandFilterDef = getBrandFilterDef(fetchedBrands.data?.data)

  return brandFilterDef
}

export default useDirectoryBrandsFilterDef
