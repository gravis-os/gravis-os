import { MailDataRequired } from '@sendgrid/mail'
import Mailgen from 'mailgen'

import Sendgrid from './services/Sendgrid'

export enum MailServiceEnum {
  SENDGRID = 'SENDGRID',
}

export interface MakeMailProps {
  from: string
  mailService?: MailServiceEnum
  mailgenConfig: {
    link: string
    logo: string
    logoHeight?: number
    name: string
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
    product: {
      ...mailgenConfig,
      logoHeight: `${mailgenConfig.logoHeight || 48}px`,
    },
    theme: 'default',
  })

  const Mail = {
    send: async ({
      attachments,
      blacklist,
      email,
      from = injectedFrom,
      headers,
      replyTo,
      subject,
      to,
    }: {
      attachments?: MailDataRequired['attachments']
      blacklist?: string[]
      email: Mailgen.Content
      from?: string
      headers?: Record<string, string>
      replyTo?: MailDataRequired['replyTo']
      subject: string
      to: string
    }) => {
      const shouldSkip = Boolean(
        blacklist?.some((email) => email === to?.toLowerCase())
      )
      if (shouldSkip) return

      return Sendgrid.send({
        attachments,
        from,
        headers,
        html: mailgen.generate(email),
        replyTo,
        subject,
        text: mailgen.generatePlaintext(email),
        to,
      })
    },
  }

  return Mail
}

export default makeMail
