import { DocumentTypeEnum } from './constants'

const getDocumentPrefixByType = (type) => {
  switch (type) {
    case DocumentTypeEnum.QUOTATION: {
      return 'QT'
    }
    case DocumentTypeEnum.INVOICE: {
      return 'INV'
    }
    case DocumentTypeEnum.SALES_ORDER: {
      return 'SO'
    }
    case DocumentTypeEnum.PURCHASE_ORDER: {
      return 'PO'
    }
    case DocumentTypeEnum.DELIVERY_ORDER: {
      return 'DO'
    }
    case DocumentTypeEnum.DEBIT_NOTE: {
      return 'DN'
    }
    case DocumentTypeEnum.CREDIT_NOTE: {
      return 'CN'
    }
    case DocumentTypeEnum.LOAN_FORM: {
      return 'LF'
    }
    case DocumentTypeEnum.SUPPLIER_INVOICE: {
      return 'SI'
    }
    case DocumentTypeEnum.GOODS_RETURN_NOTE: {
      return 'GRN'
    }
    default: {
      return ''
    }
  }
}

export default getDocumentPrefixByType
