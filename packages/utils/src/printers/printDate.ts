import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const outputFormat = 'MMMM D, YYYY'

const printDateTime = (dateTime: Date | string, inputFormat = '') => {
  if (!dateTime) return
  if (inputFormat) return dayjs(dateTime, inputFormat).format(outputFormat)
  return dayjs(dateTime).format(outputFormat)
}

export default printDateTime
