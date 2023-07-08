import React from 'react'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import Box, { BoxProps } from '../Box'
import Stack from '../Stack'
import Typography, { TypographyProps } from '../Typography'
import { ContainerProps } from '../Container'

export interface HeaderAnnouncementProps {
  boxProps?: BoxProps
  containerProps?: ContainerProps

  title: TypographyProps['children']
  titleProps?: TypographyProps

  href?: TypographyProps['href']
  hrefTitle?: TypographyProps['children']
  hrefProps?: TypographyProps
}

const HeaderAnnouncement: React.FC<HeaderAnnouncementProps> = (props) => {
  const {
    title,
    href,
    hrefTitle,
    titleProps,
    hrefProps,
    boxProps,
    containerProps,
  } = props

  return (
    <Box
      sx={{
        py: 0.5,
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        textAlign: 'center',
      }}
      {...boxProps}
    >
      <Stack
        {...containerProps}
        direction="row"
        spacing={0.5}
        center
        maxWidth="100%"
        flexWrap="wrap"
      >
        {/* Announcement Title */}
        <Typography variant="body2" {...titleProps}>
          {title}
        </Typography>

        {/* Announcement read more href */}
        {href && (
          <Typography
            href={href}
            color="secondary"
            variant="body2"
            endIcon={
              <ArrowForwardOutlinedIcon
                sx={{ '&&': { fontSize: 'body2.fontSize' } }}
              />
            }
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
