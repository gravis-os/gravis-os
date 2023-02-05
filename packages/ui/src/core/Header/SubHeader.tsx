import React, { useState } from 'react'
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
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import Button, { ButtonProps } from '../Button'
import Link from '../Link'
import Container, { ContainerProps } from '../Container'

interface SubHeaderButton {
  title: string
  href: string
  ButtonProps?: ButtonProps
}

export interface SubHeaderProps extends Omit<AppBarProps, 'color' | 'title'> {
  title: SubHeaderButton | string
  button?: SubHeaderButton
  links?: SubHeaderButton[]
  blend?: 'light' | 'dark'
  containerProps?: ContainerProps
}

const SubHeader: React.FC<SubHeaderProps> = (props) => {
  const { containerProps, blend = 'light', links, title, button } = props

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
            key={link.title}
            href={link.href}
            size="small"
            variant="text"
            onClick={handleLinkClick}
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
          backgroundColor:
            blend === 'light'
              ? 'rgba(255, 255, 255, 0.65)'
              : 'rgba(0, 0, 0, 0.65)',
          color: blend === 'light' ? 'text.primary' : 'white',
          backdropFilter: 'saturate(180%) blur(20px)',
          boxShadow: 'none',
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
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
              <Button size="small" href={button.href} variant="contained">
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
