import startCase from 'lodash/startCase'
import chunk from 'lodash/chunk'

/**
 * Get Slack formats for both text and blocks given an intro string and object payload
 * Constructs a Slack post notification with the payload in both text or blocks formats
 * @param introText
 * @param payload
 */
const getSlackFormats = (
  introText: string,
  payload: Record<string, string>
): {
  payloadAsText: string
  payloadAsBlocks: Array<{
    type: string
    text?: Record<string, string>
    fields?: Array<{ type: string; text: string }>
  }>
} => {
  const payloadAsTextArr = [
    introText,
    ...Object.entries(payload).reduce((acc, [key, value]) => {
      return acc.concat(`- ${startCase(key)}: ${value}`)
    }, []),
  ].filter(Boolean)
  const payloadAsText = payloadAsTextArr.join('\n')
  const payloadAsBlockFields = Object.entries(payload).reduce(
    (acc, [key, value]) => {
      return acc.concat({
        type: 'mrkdwn',
        text: `*${startCase(key)}*\n${value || '-'}\n`,
      })
    },
    []
  )
  const payloadAsBlocks = [
    {
      type: 'section',
      text: { type: 'mrkdwn', text: introText },
    },
    ...chunk(payloadAsBlockFields, 2).map((payloadArrChunk) => {
      return {
        type: 'section',
        fields: payloadArrChunk,
      }
    }),
  ]
  return { payloadAsText, payloadAsBlocks }
}

export default getSlackFormats
