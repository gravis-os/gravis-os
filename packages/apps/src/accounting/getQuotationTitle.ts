import getDocumentTitle from './getDocumentTitle'

const getQuotationTitle = (props = {}) =>
  getDocumentTitle({ prefix: 'QT', ...props })

export default getQuotationTitle
