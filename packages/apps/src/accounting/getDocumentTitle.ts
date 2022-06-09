const yyyy = new Date().getFullYear()

// e.g. Prefix-2022-0000001-01
const getDocumentTitle = ({ prefix, counter = 1, version = 1 }) =>
  `#${prefix}-${yyyy}-${String(counter).padStart(6, '0')}-${String(
    version
  ).padStart(2, '0')}`

export default getDocumentTitle
