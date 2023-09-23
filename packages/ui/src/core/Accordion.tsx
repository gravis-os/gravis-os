import React from 'react'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import {
  AccordionDetails,
  AccordionSummary,
  Accordion as MuiAccordion,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import Box, { BoxProps } from './Box'
import IconButton, { IconButtonProps } from './IconButton'
import Stack from './Stack'
import Typography, { TypographyProps } from './Typography'

export enum AccordionIconVariantEnum {
  Caret = 'caret',
  Plus = 'plus',
}

export interface AccordionProps {
  contentProps?: TypographyProps
  defaultExpandAll?: boolean
  defaultExpandAllOnDesktopOnly?: boolean
  defaultExpandedKeys?: string[]
  disablePadding?: boolean
  gutterBottom?: boolean
  iconVariant?: AccordionIconVariantEnum
  items?: Array<{
    actionIconButtons?: IconButtonProps[]
    children?: React.ReactNode
    content?: React.ReactNode
    disablePadding?: boolean
    key: string
    title: React.ReactNode
  }>
  sx?: BoxProps['sx']
  titleProps?: TypographyProps
  transparent?: boolean
}

export const ACCORDION_ICON_VARIANTS = {
  [AccordionIconVariantEnum.Caret]: {
    collapseIcon: ExpandMoreOutlinedIcon,
    expandIcon: ExpandMoreOutlinedIcon,
  },
  [AccordionIconVariantEnum.Plus]: {
    collapseIcon: CloseOutlinedIcon,
    expandIcon: AddOutlinedIcon,
  },
}

const Accordion: React.FC<AccordionProps> = (props) => {
  const {
    contentProps,
    defaultExpandAll,
    defaultExpandAllOnDesktopOnly,
    defaultExpandedKeys: injectedDefaultExpandedKeys = [],
    disablePadding,
    gutterBottom,
    iconVariant = AccordionIconVariantEnum.Caret,
    items: injectedItems,
    sx,
    titleProps,
    transparent,
  } = props

  // Icon
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const defaultExpandedKeys =
    defaultExpandAll || (defaultExpandAllOnDesktopOnly && isDesktop)
      ? injectedItems.map(({ key }) => key)
      : injectedDefaultExpandedKeys
  const initialExpanded =
    defaultExpandedKeys.length > 0
      ? defaultExpandedKeys.reduce((acc, defaultExpandedKey) => {
          return { ...acc, [defaultExpandedKey]: true }
        }, {})
      : {}
  const [expanded, setExpanded] = React.useState(initialExpanded)

  const handleChange = (panel) => (e, isExpanded) => {
    e.stopPropagation()
    setExpanded({ ...expanded, [panel]: isExpanded })
  }

  const items = injectedItems?.filter(Boolean)

  if (!items?.length) return null

  return (
    <Box sx={sx}>
      {items.map((item, i) => {
        const {
          title,
          actionIconButtons = [],
          children,
          content: injectedContent,
          disablePadding: disableItemPadding,
        } = item

        const key = typeof title === 'string' ? title : `accordion-item-${i}`
        const content = children || injectedContent

        const isExpanded = Boolean(expanded[key])
        const accordionIconVariant = ACCORDION_ICON_VARIANTS[iconVariant]
        const ExpansionIcon = isExpanded
          ? accordionIconVariant.collapseIcon
          : accordionIconVariant.expandIcon

        return (
          <MuiAccordion
            disableGutters={!gutterBottom}
            expanded={isExpanded}
            key={key}
            onChange={handleChange(key)}
            square
            sx={{
              '&.Mui-expanded': {
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              },
              boxShadow: 'none',
              ...(transparent && { backgroundColor: 'transparent' }),
            }}
          >
            <AccordionSummary
              expandIcon={<ExpansionIcon />}
              sx={{
                '& .MuiAccordionSummary-content': { my: 2 },
                '&:hover': { backgroundColor: 'action.hover' },
                ...(disablePadding && { px: 0 }),
              }}
            >
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                spacing={1}
              >
                <div>
                  <Typography variant="h5" {...titleProps}>
                    {title}
                  </Typography>
                </div>

                <div>
                  {Boolean(actionIconButtons?.length) && (
                    <Stack alignItems="center" direction="row" sx={{ mr: 0.5 }}>
                      {actionIconButtons.map((actionIconButton) => (
                        <IconButton
                          {...actionIconButton}
                          onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            actionIconButton.onClick(e)
                          }}
                          sx={{
                            '& svg': { fontSize: '1.25rem' },
                            // Mirror expanded icon size
                            padding: 0.5,
                            ...actionIconButton?.sx,
                          }}
                        />
                      ))}
                    </Stack>
                  )}
                </div>
              </Stack>
            </AccordionSummary>

            {/* Details */}
            <AccordionDetails
              sx={{
                ...((disablePadding || disableItemPadding) && { px: 0 }),
              }}
            >
              {typeof content === 'string' ? (
                <Typography {...contentProps}>{content}</Typography>
              ) : (
                content
              )}
            </AccordionDetails>
          </MuiAccordion>
        )
      })}
    </Box>
  )
}

export default Accordion
