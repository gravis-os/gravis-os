import { GetStaticPropsContext } from 'next/types'

const getWorkspaceSlugInGetStaticProps = (props: GetStaticPropsContext) => {
  const { params } = props
  const { workspace } = params || {}
  const workspaceSlug = String(workspace)
  return workspaceSlug
}

export default getWorkspaceSlugInGetStaticProps
