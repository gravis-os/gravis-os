import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const outputFormat = 'MMMM D, YYYY h:mm A'

const printDateTime = (dateTime: string | Date, inputFormat = '') => {
  if (!dateTime) return
  if (inputFormat) return dayjs(dateTime, inputFormat).format(outputFormat)
  return dayjs(dateTime).format(outputFormat)
}

export default printDateTime
