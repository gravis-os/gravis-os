import { CrudItem } from '@gravis-os/types'

export interface GetStaticPathsByParamsProps {
  items?: Array<CrudItem & { [key: string]: any }> | null
  fallback?: boolean
  setParams: (item: CrudItem & { [key: string]: any }) => {
    [key: string]: any
  }
  locales?: string[]
}

const getStaticPathsByParams = (props: GetStaticPathsByParamsProps) => {
  // A generic util for generating static paths with multiple params
  const { locales, setParams, items, fallback = false } = props

  const paths = locales
    ? items
        ?.map((item) => {
          return locales.map((locale) => ({
            params: typeof setParams === 'function' ? setParams(item) : item,
            locale,
          }))
        })
        .flat()
    : items?.map((item) => ({
        params: typeof setParams === 'function' ? setParams(item) : item,
      }))

  return {
    fallback,
    paths: paths || [],
  }
}

export default getStaticPathsByParams
