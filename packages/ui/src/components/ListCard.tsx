import React, { ReactNode } from 'react'

import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListProps,
} from '@mui/material'

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
  /** Removes the forward arrow if set to true */
  disableArrow?: boolean
  /** Directs to the url given if clicked */
  href?: string
  icon?: ReactNode
  key: string
  onClick?: () => void
  title: string
}

/**
 * Property of the ListCard component.
 *
 * @extends CardProps
 * @prop {ListProps} listProps?
 * @prop {ListCardItemProps[]} items
 */
export interface ListCardProps extends CardProps {
  items: ListCardItemProps[]
  listProps?: ListProps
}

const ListCard: React.FC<ListCardProps> = (props): React.ReactElement => {
  const { items, listProps, ...rest } = props
  return (
    <Card disableLastGutterBottom disablePadding padding={0} {...rest}>
      <List {...listProps}>
        {items.map((item) => {
          const { title, disableArrow, href, icon, key, onClick } = item
          const listItemProps = {
            key,
            ...(!disableArrow && {
              secondaryAction: (
                <IconButton edge="end">
                  <ArrowForwardIosOutlinedIcon color="primary" />
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
