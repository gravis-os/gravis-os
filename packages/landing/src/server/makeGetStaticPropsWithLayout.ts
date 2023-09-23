import { withLocalesToStaticProps } from '@gravis-os/utils'
import flowRight from 'lodash/flowRight'
import { GetStaticPropsResult } from 'next'

import makeWithLayoutProviderPropsToStaticProps from './makeWithLayoutProviderPropsToStaticProps'
import { LayoutConfig } from './types'
import withServerSideTranslationsToStaticProps from './withServerSideTranslationsToStaticProps'

const makeGetStaticPropsWithLayout =
  (layoutConfig: LayoutConfig) =>
  (
    staticPropsResult:
      | GetStaticPropsResult<unknown>
      | Record<string, never> = {}
  ) => {
    const withLayoutProviderPropsToStaticProps =
      makeWithLayoutProviderPropsToStaticProps(layoutConfig)
    return async (context) => {
      return flowRight([
        withServerSideTranslationsToStaticProps(context),
        withLayoutProviderPropsToStaticProps(context),
        withLocalesToStaticProps(context),
      ])(staticPropsResult)
    }
  }

export default makeGetStaticPropsWithLayout
