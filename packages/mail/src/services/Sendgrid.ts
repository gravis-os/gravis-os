import Sendgrid, { type MailDataRequired } from '@sendgrid/mail'

Sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

const CustomSendgrid = {
  send: async (props: {
    attachments?: MailDataRequired['attachments']
    from: string
    headers?: Record<string, string>
    html: string
    replyTo?: MailDataRequired['replyTo']
    subject: string
    text?: string
    to: string
  }) => {
    const { attachments, from, headers, html, replyTo, subject, text, to } =
      props

    const onSend = await Sendgrid.send({
      attachments,
      from: from || process.env.SENDGRID_FROM_EMAIL,
      headers,
      html,
      replyTo,
      subject,
      text,
      to,
    })

    return onSend
  },
}

export default CustomSendgrid
