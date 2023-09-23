import { CrudItem } from '@gravis-os/types'

export interface GetStaticPathsByParamsProps {
  fallback?: boolean
  items?: Array<CrudItem & { [key: string]: any }> | null
  locales?: string[]
  setParams: (item: CrudItem & { [key: string]: any }) => {
    [key: string]: any
  }
}

const getStaticPathsByParams = (props: GetStaticPathsByParamsProps) => {
  // A generic util for generating static paths with multiple params
  const { fallback = false, items, locales, setParams } = props

  const nextLocales = !process.env.DISABLE_LOCALES && locales

  const paths = nextLocales
    ? items
        ?.map((item) => {
          return nextLocales.map((locale) => ({
            locale,
            params: typeof setParams === 'function' ? setParams(item) : item,
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
