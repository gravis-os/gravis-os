import get from 'lodash/get'

const getPaletteColor = (paletteColor: string) => {
  return ({ palette }) =>
    get(
      palette,
      paletteColor.includes('.') ? paletteColor : `${paletteColor}.main`
    )
}

export default getPaletteColor
