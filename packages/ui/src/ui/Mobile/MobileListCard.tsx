import { ArrowForwardIos } from '@mui/icons-material'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListProps,
} from '@mui/material'
import React from 'react'
import Card, { CardProps } from '../Card'
import IconButton from '../IconButton'
import Stack from '../Stack'
import Typography, { TypographyProps } from '../Typography'

export interface MobileListCardItem {
  key: string
  label: string
  icon?: React.ReactElement
  disableArrow?: boolean
  onClick?: () => void
}

export interface MobileListCardProps {
  title?: string
  titleProps?: TypographyProps
  cardProps?: CardProps
  listProps?: ListProps
  items: MobileListCardItem[]
}

const MobileListCard: React.FC<MobileListCardProps> = (
  props
): React.ReactElement => {
  const { title, titleProps, cardProps, listProps, items, ...rest } = props
  return (
    <Stack spacing={1} {...rest}>
      <Typography variant="h3" {...titleProps}>
        {title}
      </Typography>
      <Card disablePadding disableLastGutterBottom {...cardProps}>
        <List {...listProps}>
          {items.map((item) => {
            const { key, icon, label, disableArrow, onClick } = item
            const listItemProps = {
              key,
              ...(!disableArrow && {
                secondaryAction: (
                  <IconButton edge="end">
                    <ArrowForwardIos color="primary" />
                  </IconButton>
                ),
              }),
              onClick,
            }
            return (
              <>
                <ListItem {...listItemProps}>
                  {icon && (
                    <ListItemIcon>
                      {React.cloneElement(icon, { color: 'primary' })}
                    </ListItemIcon>
                  )}
                  <ListItemText>
                    <Typography>{label}</Typography>
                  </ListItemText>
                </ListItem>
              </>
            )
          })}
        </List>
      </Card>
    </Stack>
  )
}

export default MobileListCard
