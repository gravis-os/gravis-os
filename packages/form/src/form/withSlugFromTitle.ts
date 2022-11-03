import kebabCase from 'lodash/kebabCase'

const withSlugFromTitle = () => (values) => {
  const hasTitle = values.title
  return hasTitle ? { ...values, slug: kebabCase(values.title) } : values
}

export default withSlugFromTitle
