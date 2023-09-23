export const DEFAULT_BUCKET_NAME = 'public'

/**
 * As Public Buckets have a Public prefix, Private Buckets do not have it
 * Hence we need to remove the initial Private Prefix from the path
 * Private: private/fileName
 * Public: public/public/fileName
 * @param path
 * @returns
 */
export const cleanPath = (path: string, bucketName: string): string => {
  return path.startsWith(DEFAULT_BUCKET_NAME)
    ? path
    : path.slice(Math.max(0, bucketName.length + 1))
}
