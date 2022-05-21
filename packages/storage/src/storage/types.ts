import { FileWithPath } from 'react-dropzone'

export interface File extends FileWithPath {
  /**
   * // This is a blob url. Not a blob. We use it to render into src constructed via URL.createObjectURL(file)
   * @link https://theflyingmantis.medium.com/blog-and-mime-type-a3a2aa9b7264
   */
  url?: string
  alt?: string
  id?: number // Database Id
}
