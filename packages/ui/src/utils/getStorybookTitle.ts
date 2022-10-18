import { PACKAGE_NAME } from './constants'

export const getComponentStorybookTitle = (filename: string) => {
  return `${PACKAGE_NAME} - components/${filename}`
}

export const getCoreStorybookTitle = (filename: string) => {
  return `${PACKAGE_NAME} - core/${filename}`
}
