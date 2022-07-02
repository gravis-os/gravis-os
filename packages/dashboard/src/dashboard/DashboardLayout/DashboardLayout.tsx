import React from 'react'

export interface DashboardLayoutProps {
  children?: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  const { children, ...rest } = props
  return <>{children}</>
}

export default DashboardLayout
