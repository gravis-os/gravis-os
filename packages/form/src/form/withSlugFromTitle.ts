import kebabCase from 'lodash/kebabCase'
import { CrudModule } from '@gravis-os/types'

export interface WithSlugFromTitleProps {
  module?: CrudModule
}

const withSlugFromTitle =
  (props: WithSlugFromTitleProps = {}) =>
  (values) => {
    const { module } = props
    if (module?.disableAutoSlug) return values

    const hasTitle = values.title
    return hasTitle ? { ...values, slug: kebabCase(values.title) } : values
  }

export default withSlugFromTitle
