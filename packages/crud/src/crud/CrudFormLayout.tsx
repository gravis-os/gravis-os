import React from 'react'
import { Card, Layout, LayoutProps } from '@gravis-os/ui'

export interface CrudFormLayoutProps extends LayoutProps {}

const CrudFormLayout: React.FC<CrudFormLayoutProps> = (props) => {
  const { children, rightAside } = props

  return (
    <Layout
      rightAside={
        rightAside && (
          <Card title="Actions" padding={2}>
            {rightAside}
          </Card>
        )
      }
      rightAsideSticky
    >
      {children}
    </Layout>
  )
}

export default CrudFormLayout
