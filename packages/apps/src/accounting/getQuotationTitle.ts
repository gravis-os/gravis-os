// TODO@Joel: Update quotation logic. This works for all except INV. Cannot edit invoice
// ==============================
// 2022-0000001-01
// ==============================
const getQuotationTitle = () =>
  `#QT-${new Date().toISOString().split('T')[0].replaceAll('-', '')}`

export default getQuotationTitle
