import dayjs from 'dayjs'

const printDateTime = (dateTime: string) => {
  return dayjs(dateTime).format('MMMM D, YYYY h:mm A')
}

export default printDateTime
