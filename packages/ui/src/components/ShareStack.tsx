import React from 'react'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share'

import Stack, { StackProps } from '../core/Stack'

export interface ShareStackProps extends StackProps {
  disableLinkedIn?: boolean
  disableReddit?: boolean
  title: string
  url?: string
}

const ShareStack: React.FC<ShareStackProps> = (props) => {
  const {
    title,
    disableLinkedIn,
    disableReddit,
    sx,
    url: injectedUrl,
    ...rest
  } = props

  const url =
    injectedUrl || (typeof window !== 'undefined' && window.location.href)
  const shareButtonProps = { title, url }
  const shareIconProps = { round: true, size: 32 }

  return (
    <Stack
      alignItems="center"
      direction="row"
      spacing={1}
      sx={{
        '& button:hover': { opacity: 0.8 },
        ...sx,
      }}
      {...rest}
    >
      <TelegramShareButton {...shareButtonProps}>
        <TelegramIcon {...shareIconProps} />
      </TelegramShareButton>
      <WhatsappShareButton {...shareButtonProps}>
        <WhatsappIcon {...shareIconProps} />
      </WhatsappShareButton>
      <EmailShareButton {...shareButtonProps}>
        <EmailIcon {...shareIconProps} />
      </EmailShareButton>
      <FacebookShareButton {...shareButtonProps}>
        <FacebookIcon {...shareIconProps} />
      </FacebookShareButton>
      <TwitterShareButton {...shareButtonProps}>
        <TwitterIcon {...shareIconProps} />
      </TwitterShareButton>
      {!disableLinkedIn && (
        <LinkedinShareButton {...shareButtonProps}>
          <LinkedinIcon {...shareIconProps} />
        </LinkedinShareButton>
      )}
      {!disableReddit && (
        <RedditShareButton {...shareButtonProps}>
          <RedditIcon {...shareIconProps} />
        </RedditShareButton>
      )}
    </Stack>
  )
}

export default ShareStack
