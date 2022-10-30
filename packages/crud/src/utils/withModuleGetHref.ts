import { CrudItem, CrudModule } from '@gravis-os/types'
import capitalize from 'lodash/capitalize'

export interface MakeGetModuleHrefProps {
  prefix?: string
  modules: CrudModule[]
}

/**
 * A function that returns a function that returns a href for a given module and items
 * @param prefix
 * @param modules
 */
export const makeGetModuleHref = ({
  prefix,
  modules,
}: MakeGetModuleHrefProps) => {
  return (injectedItems: CrudItem[] | CrudItem) => {
    const items = (
      Array.isArray(injectedItems) ? injectedItems : [injectedItems]
    ).filter(Boolean)

    if (!items?.length) return ''

    if (items.length !== modules.length) {
      console.error(
        `Invalid number of items provided to getModuleHref. Expected ${modules.length} modules but received ${items.length} instead.`
      )
    }

    const modelSlugs = `/${items
      .map(({ id, slug }: CrudItem) => slug || id)
      .join('/')}`

    return prefix + modelSlugs
  }
}

export interface WithModuleGetHrefProps
  extends Omit<MakeGetModuleHrefProps, 'modules'> {
  getHrefInfix: string
  prefixModules?: CrudModule[]
}

export type GetModuleHrefFunction = (items: CrudItem[] | CrudItem) => string

export type WithModuleGetHrefReturn<T> = CrudModule & {
  [key in keyof T]: GetModuleHrefFunction
}

/**
 * A HOC function to wrap over a CrudModule that returns a CrudModule
 * with a get[Dynamic]Href function
 * @param withModuleGetHrefProps
 */
const withModuleGetHref =
  <T>(withModuleGetHrefProps: WithModuleGetHrefProps) =>
  (module: CrudModule): WithModuleGetHrefReturn<T> => {
    const { getHrefInfix, ...rest } = withModuleGetHrefProps

    const getModuleHref = makeGetModuleHref({
      ...rest,
      modules: [...(rest?.prefixModules || []), module].filter(Boolean),
    })

    return {
      ...module,
      [`get${capitalize(getHrefInfix)}Href`]: getModuleHref,
    } as WithModuleGetHrefReturn<T>
  }

export default withModuleGetHref
