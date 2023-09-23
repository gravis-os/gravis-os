import React, { useState } from 'react'

import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import {
  AppBar,
  AppBarProps,
  Box,
  Collapse,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'

import Button, { ButtonProps } from '../Button'
import Container, { ContainerProps } from '../Container'
import Link from '../Link'

interface SubHeaderButton {
  ButtonProps?: ButtonProps
  href: string
  title: string
}

export interface SubHeaderProps extends Omit<AppBarProps, 'color' | 'title'> {
  blend?: 'dark' | 'light'
  button?: SubHeaderButton
  containerProps?: ContainerProps
  links?: SubHeaderButton[]
  title: SubHeaderButton | string
}

const SubHeader: React.FC<SubHeaderProps> = (props) => {
  const { title, blend = 'light', button, containerProps, links } = props

  // isMobileMenuOpen state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const handleIsMobileMenuOpenToggle = () =>
    setIsMobileMenuOpen(!isMobileMenuOpen)
  const handleLinkClick = () => setIsMobileMenuOpen(false)

  const linksJsx = (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      sx={{ mr: { xs: 0, md: 2 } }}
    >
      {links?.map((link) => {
        return (
          <Button
            href={link.href}
            key={link.title}
            onClick={handleLinkClick}
            size="small"
            variant="text"
            {...link.ButtonProps}
          >
            {link.title}
          </Button>
        )
      })}
    </Stack>
  )

  return (
    <>
      <AppBar
        component="nav"
        position="sticky"
        sx={{
          backdropFilter: 'saturate(180%) blur(20px)',
          backgroundColor:
            blend === 'light'
              ? 'rgba(255, 255, 255, 0.65)'
              : 'rgba(0, 0, 0, 0.65)',
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          boxShadow: 'none',
          color: blend === 'light' ? 'text.primary' : 'white',
        }}
      >
        <Container {...containerProps}>
          <Toolbar variant="dense">
            {/* Title */}
            <Box sx={{ flexGrow: 1 }}>
              {typeof title === 'string' ? (
                <Typography variant="h6">{title}</Typography>
              ) : (
                <Link href={title.href} onClick={handleLinkClick}>
                  <Typography variant="h6">{title.title}</Typography>
                </Link>
              )}
            </Box>

            {/* Links: Desktop */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>{linksJsx}</Box>
            {/* Links: Mobile Trigger */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <IconButton
                onClick={handleIsMobileMenuOpenToggle}
                sx={{
                  transform: isMobileMenuOpen
                    ? 'rotate(180deg)'
                    : 'rotate(0deg)',
                  transition: (theme) =>
                    theme.transitions.create('transform', {
                      duration: theme.transitions.duration.shortest,
                    }),
                }}
              >
                <ExpandMoreOutlinedIcon />
              </IconButton>
            </Box>

            {/* Button */}
            {button && (
              <Button href={button.href} size="small" variant="contained">
                {button.title}
              </Button>
            )}
          </Toolbar>

          {/* Links Mobile */}
          <Collapse in={isMobileMenuOpen}>
            <Box py={2}>{linksJsx}</Box>
          </Collapse>
        </Container>
      </AppBar>
    </>
  )
}

export default SubHeader
