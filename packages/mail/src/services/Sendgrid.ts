import Sendgrid from '@sendgrid/mail'

Sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

const CustomSendgrid = {
  send: async (props: {
    to: string
    from: string
    subject: string
    html: string
    text?: string
  }) => {
    const { from, to, subject, html, text } = props

    const onSend = await Sendgrid.send({
      from: from || process.env.SENDGRID_FROM_EMAIL,
      to,
      subject,
      html,
      text,
    })

    return onSend
  },
}

export default CustomSendgrid
