import download from 'downloadjs'
import { File } from './useFiles'

/**
 * Convert blobUrl to blob to enable file renaming with mimeType
 * Note: A blobUrl is not a blob. It is usually shaped as: `blob:http://<hostname>/<hash>`
 * @link https://theflyingmantis.medium.com/blog-and-mime-type-a3a2aa9b7264
 */
const downloadFromBlobUrl = async (file: File) => {
  const { url, name, type } = file
  const blob = await fetch(url).then((r) => r.blob())
  download(blob, name, type)
}

export default downloadFromBlobUrl
