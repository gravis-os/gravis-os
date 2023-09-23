import React from 'react'

import { Card, Layout, LayoutProps } from '@gravis-os/ui'

export interface CrudFormLayoutProps extends LayoutProps {}

const CrudFormLayout: React.FC<CrudFormLayoutProps> = (props) => {
  const { children, rightAside } = props

  return (
    <Layout
      {...(rightAside && {
        rightAside: (
          <Card padding={2} title="Actions">
            {rightAside}
          </Card>
        ),
      })}
      rightAsideSticky
    >
      {children}
    </Layout>
  )
}

export default CrudFormLayout
