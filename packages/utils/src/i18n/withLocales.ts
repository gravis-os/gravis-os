import { CrudItem } from '@gravis-os/types'
import flowRight from 'lodash/flowRight'

import withBlockedLocales from './withBlockedLocales'
import withExclusiveLocales from './withExclusiveLocales'

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
