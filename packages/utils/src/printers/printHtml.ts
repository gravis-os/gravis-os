import sanitizeHtml from 'sanitize-html'

const printHtml = (htmlString: string) =>
  sanitizeHtml(htmlString, {
    allowedSchemesByTag: {
      img: ['data'],
    },
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
  })

export default printHtml
