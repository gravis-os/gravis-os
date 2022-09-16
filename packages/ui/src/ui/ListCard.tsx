import { ArrowForwardIos } from '@mui/icons-material'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListProps,
} from '@mui/material'
import React, { ReactNode } from 'react'
import Card, { CardProps } from './Card'
import IconButton from './IconButton'
import Typography from './Typography'
import withHref from './withHref'

export interface ListCardItemProps {
  key: string
  title: string
  icon?: ReactNode
  disableArrow?: boolean
  onClick?: () => void
  href?: string
}

export interface ListCardProps extends CardProps {
  listProps?: ListProps
  items: ListCardItemProps[]
}

const ListCard: React.FC<ListCardProps> = (props): React.ReactElement => {
  const { listProps, items, ...rest } = props
  return (
    <Card disablePadding disableLastGutterBottom padding={0} {...rest}>
      <List {...listProps}>
        {items.map((item) => {
          const { key, icon, title, disableArrow, onClick, href } = item
          const listItemProps = {
            key,
            ...(!disableArrow && {
              secondaryAction: (
                <IconButton edge="end">
                  <ArrowForwardIos color="primary" />
                </IconButton>
              ),
            }),
            // Set cursor to pointer if onClick or href is supplied
            ...((onClick || href) && { sx: { cursor: 'pointer' } }),
            onClick,
          }

          const childrenJsx = (
            <ListItem {...listItemProps}>
              {icon && (
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  {icon}
                </ListItemIcon>
              )}
              <ListItemText>
                <Typography variant="subtitle2">{title}</Typography>
              </ListItemText>
            </ListItem>
          )

          return withHref({ href })(childrenJsx)
        })}
      </List>
    </Card>
  )
}

export default ListCard
