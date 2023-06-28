import { PACKAGE_NAME } from '../server/constants'

const getStorybookTitle = (filename: string) => {
  return `${PACKAGE_NAME}/${filename}`
}

export default getStorybookTitle
