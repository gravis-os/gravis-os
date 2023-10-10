'use client'

import { useSearchParams } from 'next/navigation'

// Get workspace slug from router
const useWorkspaceSlugFromRouter = () => {
  const searchParams = useSearchParams()
  const workspaceSlug = searchParams.get('workspace') ? String(searchParams.get('workspace')) : ''
  return workspaceSlug
}

export default useWorkspaceSlugFromRouter
