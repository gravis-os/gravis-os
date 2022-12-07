import React from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material'
import Typography, { TypographyProps } from './Typography'

export enum AccordionIconVariantEnum {
  Plus = 'plus',
  Caret = 'caret',
}

export interface AccordionProps {
  transparent?: boolean
  gutterBottom?: boolean
  defaultExpandAll?: boolean
  disablePadding?: boolean
  items?: Array<{
    key: string
    title: React.ReactNode
    children?: React.ReactNode
    content?: React.ReactNode
  }>
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
    disablePadding,
    titleProps,
    defaultExpandedKeys: injectedDefaultExpandedKeys = [],
    iconVariant = AccordionIconVariantEnum.Caret,
  } = props

  // Icon
  const defaultExpandedKeys = defaultExpandAll
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
        const { key, title } = item
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
              <Typography variant="h5" {...titleProps}>
                {title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                ...(disablePadding && { px: 0 }),
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
