import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

import styles from './index.module.css'

function Homepage() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <main className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/introduction"
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title="Docs" description={`${siteConfig.title} Product Guide`}>
      <Homepage />
    </Layout>
  )
}
