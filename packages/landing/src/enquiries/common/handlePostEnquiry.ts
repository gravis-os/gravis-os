import { NextRequest, NextResponse } from 'next/server'
import { EnquiryTypeEnum } from './constants'
import getSlackFormats from '../slack/getSlackFormats'
import { getDomainAndPathTagsFromUrl } from './utils'

const getAudienceByType = (type: EnquiryTypeEnum) => {
  switch (type) {
    case EnquiryTypeEnum.LEAD:
      return 'lead'
    case EnquiryTypeEnum.NEWSLETTER:
      return 'subscriber'
    case EnquiryTypeEnum.RESOURCE:
      return 'honey bee'
    case EnquiryTypeEnum.ENQUIRY:
    default:
      return 'enquiry'
  }
}

const getTargetSlackChannelByType = (type: EnquiryTypeEnum) => {
  switch (type) {
    case EnquiryTypeEnum.LEAD:
      return '#sales'
    case EnquiryTypeEnum.NEWSLETTER:
      return '#newsletters'
    case EnquiryTypeEnum.RESOURCE:
      return '#honeypots'
    case EnquiryTypeEnum.ENQUIRY:
    default:
      return '#enquiries'
  }
}

export interface PostEnquiryRequestBody {
  origin: string // window.location.href sent from browser
  type: EnquiryTypeEnum
  name?: string
  email?: string
  mobile?: string
  message?: string
  needs?: Array<{ key: string; value: string; label: string }>
  source?: string
  job_department?: string
  job_role?: string
  company_size?: string
}

export interface HandlePostEnquiryNextRequest extends NextRequest {
  body: NextRequest['body'] & PostEnquiryRequestBody
}

const handlePostEnquiry = async (req: HandlePostEnquiryNextRequest) => {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const {
      origin,
      name,
      email,
      mobile,
      message,
      type = EnquiryTypeEnum.ENQUIRY,
      needs = [],
      source,
      job_department,
      job_role,
      company_size,
    } = await req.json()

    const now = new Date()
    const date = now.toDateString()
    const time = now.toTimeString()

    const payload = {
      name,
      mobile,
      email,
      message,
      date,
      time,
      source,
      needs: needs.map(({ value }) => value).join(', '),
      job_department,
      job_role,
      company_size,
    }
    const introText = `<!here> We have a new ${getAudienceByType(
      type
    )} from ${origin}! Here are the details:`
    const { payloadAsBlocks } = getSlackFormats(introText, payload)

    const channel = getTargetSlackChannelByType(type)

    const { domain, path } = getDomainAndPathTagsFromUrl(origin)

    const mailchimpListId = process.env.MAILCHIMP_LIST_ID
    const mailchimpRequest = fetch(
      `https://us2.api.mailchimp.com/3.0/lists/${mailchimpListId}/members/${email}?skip_merge_validation=false`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Basic ${btoa(
            `anystring:${process.env.MAILCHIMP_API_KEY}`
          )}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          tags: [
            `Type: ${type}`,
            `Date: ${date}`,
            domain,
            path,
            `JD: ${job_department}`,
            `JR: ${job_role}`,
            `CS: ${company_size}`,
            `SRC: ${source}`,
          ].filter(Boolean),
          merge_fields: {
            FNAME: name,
            PHONE: mobile ?? '',
          },
        }),
      }
    )

    const slackRequest = fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SLACK_ENQUIRY_BOT_OAUTH_TOKEN}`,
      },
      body: JSON.stringify({
        icon_emoji: ':sparkles',
        channel,
        blocks: payloadAsBlocks,
      }),
    })

    await Promise.all([slackRequest, mailchimpRequest])

    return NextResponse.json(
      { data: 'Successfully submitted!' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export default handlePostEnquiry
