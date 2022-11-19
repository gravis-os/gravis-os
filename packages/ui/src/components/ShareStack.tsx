import React from 'react'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  EmailIcon,
  TelegramIcon,
  WhatsappIcon,
} from 'react-share'
import Stack, { StackProps } from '../core/Stack'

export interface ShareStackProps extends StackProps {
  title: string
  url?: string
  disableLinkedIn?: boolean
  disableReddit?: boolean
}

const ShareStack: React.FC<ShareStackProps> = (props) => {
  const {
    disableLinkedIn,
    disableReddit,
    title,
    url: injectedUrl,
    sx,
    ...rest
  } = props

  const url =
    injectedUrl || (typeof window !== 'undefined' && window.location.href)
  const shareButtonProps = { title, url }
  const shareIconProps = { size: 32, round: true }

  return (
    <Stack
      direction="row"
      alignItems="center"
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
