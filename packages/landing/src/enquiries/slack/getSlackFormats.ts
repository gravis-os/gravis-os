import chunk from 'lodash/chunk'
import startCase from 'lodash/startCase'

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
  payloadAsBlocks: Array<{
    fields?: Array<{ text: string; type: string }>
    text?: Record<string, string>
    type: string
  }>
  payloadAsText: string
} => {
  const payloadAsTextArr = [
    introText,
    ...Object.entries(payload).reduce((acc, [key, value]) => {
      return [...acc, `- ${startCase(key)}: ${value}`]
    }, []),
  ].filter(Boolean)
  const payloadAsText = payloadAsTextArr.join('\n')
  const payloadAsBlockFields = Object.entries(payload).reduce(
    (acc, [key, value]) => {
      return [
        ...acc,
        {
          text: `*${startCase(key)}*\n${value || '-'}\n`,
          type: 'mrkdwn',
        },
      ]
    },
    []
  )
  const payloadAsBlocks = [
    {
      text: { text: introText, type: 'mrkdwn' },
      type: 'section',
    },
    ...chunk(payloadAsBlockFields, 2).map((payloadArrChunk) => {
      return {
        fields: payloadArrChunk,
        type: 'section',
      }
    }),
  ]
  return { payloadAsBlocks, payloadAsText }
}

export default getSlackFormats
