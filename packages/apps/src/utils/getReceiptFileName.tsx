import dayjs from 'dayjs'
import padStart from 'lodash/padStart'
import posConfig from '../pos/posConfig'

const getReceiptFileName = (receipt_id: string) => {
  return `${posConfig.prefix}${dayjs().format('YYYYMM')}${padStart(
    receipt_id,
    6,
    '0'
  )}.pdf`
}

export default getReceiptFileName
