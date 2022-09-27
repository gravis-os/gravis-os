import sanitizeHtml from 'sanitize-html'

const printHtml = (htmlString: string) => sanitizeHtml(htmlString)

export default printHtml
