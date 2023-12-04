/**
 * fileDate shape from CSV Reader should be like this:
 * [
 *   ['title', 'subtitle'],                // header
 *   ['Test', 'Sub Title Test']            // value 1
 *   ['Another Title', 'Another Subtitle'] // value 2
 *   // ...
 * ]
 */
export const isValidFileData = (rows) =>
  rows && Array.isArray(rows) && rows.every((row) => Array.isArray(row))
