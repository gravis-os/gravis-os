import Mailgen from 'mailgen'
import Sendgrid from './services/Sendgrid'

export enum MailServiceEnum {
  SENDGRID = 'SENDGRID',
}

export interface MakeMailProps {
  from: string
  mailService?: MailServiceEnum
  mailgenConfig: {
    name: string
    link: string
    logo: string
    logoHeight?: number
  }
}

/**
 * const Mail = initMail({ adapter, from:, defaultOptions })
 * export default Mail
 *
 * await Mail.send({ to, subject, email })
 */
const makeMail = (props: MakeMailProps) => {
  const { from, mailgenConfig, mailService = MailServiceEnum.SENDGRID } = props

  // Configure mailgen by setting a theme and your product info
  const mailgen = new Mailgen({
    theme: 'default',
    product: {
      ...mailgenConfig,
      logoHeight: `${mailgenConfig.logoHeight || 48}px`,
    },
  })

  const Mail = {
    send: async ({ to, subject, email }) => {
      return Sendgrid.send({
        from,
        to,
        subject,
        html: mailgen.generate(email),
        text: mailgen.generatePlaintext(email),
      })
    },
  }

  return Mail
}

export default makeMail
