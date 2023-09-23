import get from 'lodash/get'

import getPaletteColorOrFallback from './getPaletteColorOrFallback'

const setThemeColor = (color?: string, fallback = '') => {
  return ({ palette }) =>
    getPaletteColorOrFallback({
      color,
      palette,
    }) || get(palette, fallback, '')
}

export default setThemeColor
