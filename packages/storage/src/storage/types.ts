import type { FileWithPath } from 'react-dropzone'

export interface File extends FileWithPath {
  /**
   * // This is a blob url. Not a blob. We use it to render into src constructed via URL.createObjectURL(file)
   * @link https://theflyingmantis.medium.com/blog-and-mime-type-a3a2aa9b7264
   */
  url?: string // The blob to render in UI
  src?: string // S3 path
  alt?: string
  id?: number // Database Id
  position?: number // Position for sorting typically a float value with baseline 0 and -1 and 1 bounds.
}
