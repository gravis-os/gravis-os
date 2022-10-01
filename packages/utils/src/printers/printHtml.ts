import sanitizeHtml from 'sanitize-html'

const printHtml = (htmlString: string) =>
  sanitizeHtml(htmlString, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedSchemesByTag: {
      img: ['data'],
    },
  })

export default printHtml
