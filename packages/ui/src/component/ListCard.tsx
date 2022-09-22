import { ArrowForwardIos } from '@mui/icons-material'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListProps,
} from '@mui/material'
import React, { ReactNode } from 'react'
import Card, { CardProps } from '../core/Card'
import IconButton from '../core/IconButton'
import Typography from '../core/Typography'
import withHref from '../core/withHref'

/**
 * Property of the each individual List item in the ListCard component.
 *
 * @prop {string} key
 * @prop {string} title
 * @prop {ReactNode} icon?
 * @prop {boolean} disableArrow?
 * @prop {() => void} onClick?
 * @prop {string} href?
 */
export interface ListCardItemProps {
  key: string
  title: string
  icon?: ReactNode
  /** Removes the forward arrow if set to true */
  disableArrow?: boolean
  onClick?: () => void
  /** Directs to the url given if clicked */
  href?: string
}

/**
 * Property of the ListCard component.
 *
 * @extends CardProps
 * @prop {ListProps} listProps?
 * @prop {ListCardItemProps[]} items
 */
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
