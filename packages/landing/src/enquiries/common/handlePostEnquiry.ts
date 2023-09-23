import { NextRequest, NextResponse } from 'next/server'

import getSlackFormats from '../slack/getSlackFormats'
import { EnquiryTypeEnum } from './constants'
import { getDomainAndPathTagsFromUrl } from './utils'

const getAudienceByType = (type: EnquiryTypeEnum) => {
  switch (type) {
    case EnquiryTypeEnum.LEAD: {
      return 'lead'
    }
    case EnquiryTypeEnum.NEWSLETTER: {
      return 'subscriber'
    }
    case EnquiryTypeEnum.RESOURCE: {
      return 'honey bee'
    }
    case EnquiryTypeEnum.ENQUIRY:
    default: {
      return 'enquiry'
    }
  }
}

const getTargetSlackChannelByType = (type: EnquiryTypeEnum) => {
  switch (type) {
    case EnquiryTypeEnum.LEAD: {
      return '#sales'
    }
    case EnquiryTypeEnum.NEWSLETTER: {
      return '#newsletters'
    }
    case EnquiryTypeEnum.RESOURCE: {
      return '#honeypots'
    }
    case EnquiryTypeEnum.ENQUIRY:
    default: {
      return '#enquiries'
    }
  }
}

export interface PostEnquiryRequestBody {
  email?: string
  job_department?: string
  job_role?: string
  message?: string
  mobile?: string
  name?: string
  needs?: Array<{ key: string; label: string; value: string }>
  origin: string // window.location.href sent from browser
  source?: string
  type: EnquiryTypeEnum
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
      country,
      email,
      industry,
      job_department,
      job_role,
      message,
      mobile,
      name,
      needs = [],
      origin,
      source,
      type = EnquiryTypeEnum.ENQUIRY,
    } = await req.json()

    const now = new Date()
    const date = now.toDateString()
    const time = now.toTimeString()

    const payload = {
      country,
      date,
      email,
      industry,
      job_department,
      job_role,
      message,
      mobile,
      name,
      needs: needs.map(({ value }) => value).join(', '),
      source,
      time,
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
        body: JSON.stringify({
          email_address: email,
          merge_fields: {
            FNAME: name,
            PHONE: mobile ?? '',
          },
          status: 'subscribed',
          tags: [
            `Type: ${type}`,
            `Date: ${date}`,
            `Domain: ${domain}`,
            `Path: ${path}`,
            `Source: ${source}`,
            job_department ? `Jd: ${job_department}` : '',
            job_role ? `Jr: ${job_role}` : '',
            industry ? `Industry: ${industry}` : '',
            country ? `Country: ${country}` : '',
          ].filter(Boolean),
        }),
        headers: {
          Authorization: `Basic ${btoa(
            `anystring:${process.env.MAILCHIMP_API_KEY}`
          )}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      }
    )

    const slackRequest = fetch('https://slack.com/api/chat.postMessage', {
      body: JSON.stringify({
        blocks: payloadAsBlocks,
        channel,
        icon_emoji: ':sparkles',
      }),
      headers: {
        Authorization: `Bearer ${process.env.SLACK_ENQUIRY_BOT_OAUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
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
