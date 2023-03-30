import Sendgrid, { MailDataRequired } from '@sendgrid/mail'

Sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

const CustomSendgrid = {
  send: async (props: {
    to: string
    from: string
    subject: string
    html: string
    text?: string
    attachments?: MailDataRequired['attachments']
  }) => {
    const { from, to, subject, html, text, attachments } = props

    const onSend = await Sendgrid.send({
      from: from || process.env.SENDGRID_FROM_EMAIL,
      to,
      subject,
      html,
      text,
      attachments,
    })

    return onSend
  },
}

export default CustomSendgrid
