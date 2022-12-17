import React from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Typography, { TypographyProps } from './Typography'
import Stack, { StackProps } from './Stack'
import IconButton, { IconButtonProps } from './IconButton'

export enum AccordionIconVariantEnum {
  Plus = 'plus',
  Caret = 'caret',
}

export interface AccordionProps {
  gutterBottom?: boolean
  defaultExpandAll?: boolean
  defaultExpandAllOnDesktopOnly?: boolean
  disablePadding?: boolean
  items?: Array<{
    key: string
    title: React.ReactNode
    children?: React.ReactNode
    content?: React.ReactNode
    actionIconButtons?: IconButtonProps[]
    disablePadding?: boolean
  }>
  transparent?: boolean
  titleProps?: TypographyProps
  defaultExpandedKeys?: string[]
  iconVariant?: AccordionIconVariantEnum
}

export const ACCORDION_ICON_VARIANTS = {
  [AccordionIconVariantEnum.Plus]: {
    expandIcon: AddOutlinedIcon,
    collapseIcon: CloseOutlinedIcon,
  },
  [AccordionIconVariantEnum.Caret]: {
    expandIcon: ExpandMoreOutlinedIcon,
    collapseIcon: ExpandMoreOutlinedIcon,
  },
}

const Accordion: React.FC<AccordionProps> = (props) => {
  const {
    items: injectedItems,
    transparent,
    gutterBottom,
    defaultExpandAll,
    defaultExpandAllOnDesktopOnly,
    disablePadding,
    titleProps,
    defaultExpandedKeys: injectedDefaultExpandedKeys = [],
    iconVariant = AccordionIconVariantEnum.Caret,
  } = props

  // Icon
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const defaultExpandedKeys =
    defaultExpandAll || (defaultExpandAllOnDesktopOnly && isDesktop)
      ? injectedItems.map(({ key }) => key)
      : injectedDefaultExpandedKeys
  const initialExpanded = defaultExpandedKeys.length
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
    <div>
      {items.map((item) => {
        const {
          key,
          title,
          actionIconButtons = [],
          disablePadding: disableItemPadding,
        } = item
        const content = item.children || item.content

        const isExpanded = Boolean(expanded[key])
        const accordionIconVariant = ACCORDION_ICON_VARIANTS[iconVariant]
        const ExpansionIcon = isExpanded
          ? accordionIconVariant.collapseIcon
          : accordionIconVariant.expandIcon

        return (
          <MuiAccordion
            expanded={isExpanded}
            onChange={handleChange(key)}
            key={key}
            square
            disableGutters={!gutterBottom}
            sx={{
              boxShadow: 'none',
              '&.Mui-expanded': {
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              },
              ...(transparent && { backgroundColor: 'transparent' }),
            }}
          >
            <AccordionSummary
              expandIcon={<ExpansionIcon />}
              sx={{
                '&:hover': { backgroundColor: 'action.hover' },
                '& .MuiAccordionSummary-content': { my: 2 },
                ...(disablePadding && { px: 0 }),
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
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
                    <Stack direction="row" alignItems="center" sx={{ mr: 0.5 }}>
                      {actionIconButtons.map((actionIconButton) => (
                        <IconButton
                          {...actionIconButton}
                          sx={{
                            // Mirror expanded icon size
                            padding: 0.5,
                            '& svg': { fontSize: '1.25rem' },
                            ...actionIconButton?.sx,
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            actionIconButton.onClick(e)
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
                <Typography>{content}</Typography>
              ) : (
                content
              )}
            </AccordionDetails>
          </MuiAccordion>
        )
      })}
    </div>
  )
}

export default Accordion
