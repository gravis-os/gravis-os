/**
 * As Public Buckets have a Public prefix, Private Buckets do not have it
 * Hence we need to remove the initial Private Prefix from the path
 * Private: private/fileName
 * Public: public/public/fileName
 * @param path
 * @returns
 */
export const removePrivateFromPath = (
  path: string,
  bucketName: string
): string => {
  return path.substring(bucketName.length)
}
