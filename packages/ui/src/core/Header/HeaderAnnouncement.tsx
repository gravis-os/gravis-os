import React from 'react'

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'

import Box, { BoxProps } from '../Box'
import { ContainerProps } from '../Container'
import Stack from '../Stack'
import Typography, { TypographyProps } from '../Typography'

export interface HeaderAnnouncementProps {
  boxProps?: BoxProps
  containerProps?: ContainerProps

  href?: TypographyProps['href']
  hrefProps?: TypographyProps

  hrefTitle?: TypographyProps['children']
  title: TypographyProps['children']
  titleProps?: TypographyProps
}

const HeaderAnnouncement: React.FC<HeaderAnnouncementProps> = (props) => {
  const {
    title,
    boxProps,
    containerProps,
    href,
    hrefProps,
    hrefTitle,
    titleProps,
  } = props

  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        py: 0.5,
        textAlign: 'center',
      }}
      {...boxProps}
    >
      <Stack
        {...containerProps}
        center
        direction="row"
        flexWrap="wrap"
        maxWidth="100%"
        spacing={0.5}
      >
        {/* Announcement Title */}
        <Typography variant="body2" {...titleProps}>
          {title}
        </Typography>

        {/* Announcement read more href */}
        {href && (
          <Typography
            color="secondary"
            endIcon={
              <ArrowForwardOutlinedIcon
                sx={{ '&&': { fontSize: 'body2.fontSize' } }}
              />
            }
            href={href}
            variant="body2"
            {...hrefProps}
          >
            {hrefTitle || 'Read more'}
          </Typography>
        )}
      </Stack>
    </Box>
  )
}

export default HeaderAnnouncement
