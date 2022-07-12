/**
 * Derives the document title from the parameters
 * @param {string} params.prefix document title prefix
 * @param {number} params.year current year
 * @param {number} params.counter running sequence number
 * @param {number} params.version version number
 * @example
 * // returns #SO-2022-0000001-01
 * getDocumentTitle({ prefix: 'SO', year: 2022 });
 * @example
 * // returns #OF-0000001
 * getDocumentTitle({ prefix: 'OF', year: null, version: null });
 * @returns {string} document title
 */
const getDocumentTitle = ({
  prefix,
  year = new Date().getFullYear(),
  counter = 1,
  version = 1,
}: {
  prefix: string
  year?: number | null
  counter?: number | null
  version?: number | null
}): string => {
  return '#'.concat(
    [
      prefix,
      year,
      counter && String(counter).padStart(6, '0'),
      version && String(version).padStart(2, '0'),
    ]
      .filter((part) => part !== null)
      .join('-')
  )
}

export default getDocumentTitle
