import get from 'lodash/get'

const getHoverColor = (hoverColor: string) => {
  return ({ palette }) =>
    get(palette, hoverColor.includes('.') ? hoverColor : `${hoverColor}.main`)
}

export default getHoverColor
