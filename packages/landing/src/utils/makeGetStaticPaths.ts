import { GetStaticPathsResult } from 'next/types'
import { withLocalesToStaticPaths } from '@gravis-os/utils'
import flowRight from 'lodash/flowRight'

const withFallback = (context) => (staticPathsResult: GetStaticPathsResult) => {
  return {
    ...staticPathsResult,
    fallback: false,
  }
}

/**
 * An abstracted getStaticPaths function to set default parameters
 *
 * Abstracted from @link https://github.com/i18next/next-i18next/blob/master/examples/ssg/lib/getStatic.js
 * @param staticPathsResult
 */
const makeGetStaticPaths =
  (staticPathsResult: Omit<GetStaticPathsResult, 'fallback'>) =>
  async (context) => {
    return flowRight([
      withLocalesToStaticPaths(context),
      withFallback(context),
    ])(staticPathsResult)
  }

export default makeGetStaticPaths
