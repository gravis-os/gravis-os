import { GetStaticPropsResult } from 'next'
import flowRight from 'lodash/flowRight'
import { withLocalesToStaticProps } from '@gravis-os/utils'
import { LayoutConfig } from './layoutConfig'
import makeWithLayoutProviderPropsToStaticProps from './makeWithLayoutProviderPropsToStaticProps'
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
