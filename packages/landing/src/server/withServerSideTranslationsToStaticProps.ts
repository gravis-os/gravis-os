import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const withServerSideTranslationsToStaticProps =
  (context) => async (staticPropsResult) => {
    const { locale } = context
    return {
      ...staticPropsResult,
      props: {
        ...staticPropsResult?.props,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    }
  }

export default withServerSideTranslationsToStaticProps
