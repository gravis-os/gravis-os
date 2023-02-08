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
  const {
    from: injectedFrom,
    mailgenConfig,
    mailService = MailServiceEnum.SENDGRID,
  } = props

  // Configure mailgen by setting a theme and your product info
  const mailgen = new Mailgen({
    theme: 'default',
    product: {
      ...mailgenConfig,
      logoHeight: `${mailgenConfig.logoHeight || 48}px`,
    },
  })

  const Mail = {
    send: async ({ to, from, subject, email }) => {
      return Sendgrid.send({
        to,
        from: from || injectedFrom,
        subject,
        html: mailgen.generate(email),
        text: mailgen.generatePlaintext(email),
      })
    },
  }

  return Mail
}

export default makeMail
