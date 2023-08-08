import get from 'lodash/get'

export const getIsCreateOption = ({ option, pk }) => {
  if (!get(option, pk)) return
  return option && pk && get(option, pk, '').toString().startsWith('Add "')
}
