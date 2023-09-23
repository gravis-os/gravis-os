import type { ResponsiveStyleValue } from '@mui/system/styleFunctionSx'

import isNil from 'lodash/isNil'

export type BlockPadding = ResponsiveStyleValue<any>

interface BlockVerticalPadding {
  pb?: BlockPadding
  pt?: BlockPadding
  py?: BlockPadding
}

type GetBlockPaddingFunction = (
  props: BlockVerticalPadding
) => BlockVerticalPadding

const getBlockPadding = ({ pb, pt, py }) => {
  // Handle py: 0 gracefully while avoiding 0 from returning a false value
  if (py === 0) return { py }

  // Handle injected py immediately
  if (typeof py === 'number' || typeof py === 'object') return { py }

  const defaultPadding = { xs: 5, md: 15 }
  const defaultPy = { py: defaultPadding }

  // Handle case where pt/pb is provided without py. Manage overrides
  const hasPt = !isNil(pt)
  const hasPb = !isNil(pb)
  if (hasPt || hasPb) {
    return {
      ...(hasPt ? { pt } : { pt: defaultPadding }),
      ...(hasPb ? { pb } : { pb: defaultPadding }),
    }
  }

  // Default py value
  return defaultPy
}

export default getBlockPadding
