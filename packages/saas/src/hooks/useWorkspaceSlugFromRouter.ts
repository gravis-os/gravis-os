import { useRouter } from 'next/router'

// Get workspace slug from router
const useWorkspaceSlugFromRouter = () => {
  const { query } = useRouter()
  const { workspace } = query || {}
  const workspaceSlug = workspace ? String(workspace) : ''
  return workspaceSlug
}

export default useWorkspaceSlugFromRouter
