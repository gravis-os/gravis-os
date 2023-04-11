import flowRight from 'lodash/flowRight'
import { CrudItem } from '@gravis-os/types'
import withExclusiveLocales from './withExclusiveLocales'
import withBlockedLocales from './withBlockedLocales'

/**
 * Accepts the current locale and filters out CrudItems based on it
 * @param locale
 */
const withLocales =
  ({ locale }: { locale?: string }) =>
  (itemOrItems: CrudItem | CrudItem[]): CrudItem | CrudItem[] => {
    return flowRight(
      withExclusiveLocales({ locale }),
      withBlockedLocales({ locale })
    )(itemOrItems)
  }

export default withLocales
