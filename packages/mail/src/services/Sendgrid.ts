import Sendgrid, { type MailDataRequired } from '@sendgrid/mail'

Sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

const CustomSendgrid = {
  send: async (props: {
    to: string
    from: string
    subject: string
    html: string
    headers?: Record<string, string>
    replyTo?: MailDataRequired['replyTo']
    text?: string
    attachments?: MailDataRequired['attachments']
  }) => {
    const { from, to, subject, html, text, attachments, headers, replyTo } = props

    const onSend = await Sendgrid.send({
      headers,
      from: from || process.env.SENDGRID_FROM_EMAIL,
      to,
      replyTo,
      subject,
      html,
      text,
      attachments,
    })

    return onSend
  },
}

export default CustomSendgrid
