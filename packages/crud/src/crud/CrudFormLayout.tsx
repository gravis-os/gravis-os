import React from 'react'
import { Card, Layout, LayoutProps } from '@gravis-os/ui'

export interface CrudFormLayoutProps extends LayoutProps {}

const CrudFormLayout: React.FC<CrudFormLayoutProps> = props => {
  const { children, rightAside } = props

  const rightAsideJsx = (
    <Card title="Actions" disableLastGutterBottom>
      {rightAside}
    </Card>
  )

  return (
    <Layout rightAside={rightAsideJsx} rightAsideSticky>
      {children}
    </Layout>
  )
}

export default CrudFormLayout
