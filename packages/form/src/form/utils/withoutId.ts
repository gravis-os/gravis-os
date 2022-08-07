import omit from 'lodash/omit'

const withoutId = (options) => (values) => {
  const { isNew } = options

  return isNew ? omit(values, 'id') : values
}

export default withoutId
