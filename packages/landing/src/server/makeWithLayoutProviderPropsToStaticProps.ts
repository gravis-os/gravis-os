import makeGetLayoutProviderProps from './makeGetLayoutProviderProps'
import { LayoutConfig } from './types'

const makeWithLayoutProviderPropsToStaticProps =
  (layoutConfig: LayoutConfig) => (context) => (staticPropsResult) => {
    const getLayoutProviderProps = makeGetLayoutProviderProps(layoutConfig)
    const layoutProviderProps = getLayoutProviderProps({ context })

    return {
      ...staticPropsResult,
      props: {
        ...staticPropsResult?.props,
        pageProviderProps: {
          layoutProviderProps,
        },
      },
    }
  }

export default makeWithLayoutProviderPropsToStaticProps
