import dayjs from 'dayjs'

const outputFormat = 'D MMM YYYY, HH:mm [hrs]'

const printShortDateTime = (dateTime: Date | string, inputFormat = '') => {
  if (!dateTime) return
  if (inputFormat) return dayjs(dateTime, inputFormat).format(outputFormat)
  return dayjs(dateTime).format(outputFormat)
}

export default printShortDateTime
