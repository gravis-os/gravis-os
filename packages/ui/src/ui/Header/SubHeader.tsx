import React, { useState } from 'react'
import {
  AppBar,
  AppBarProps,
  Box,
  Button,
  ButtonProps,
  Collapse,
  IconButton,
  Link,
  Toolbar,
  Typography,
  Stack,
} from '@mui/material'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import RouterLink from 'next/link'
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
          <RouterLink key={link.title} href={link.href} passHref>
            <Button
              size="small"
              variant="text"
              onClick={handleLinkClick}
              {...link.ButtonProps}
            >
              {link.title}
            </Button>
          </RouterLink>
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
              <RouterLink href={button.href} passHref>
                <Button size="small" variant="contained">
                  {button.title}
                </Button>
              </RouterLink>
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
