import React from 'react'

import { RenderPropsFunction } from '@gravis-os/types'
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListProps,
} from '@mui/material'
import get from 'lodash/get'

interface CardListRenderPropsInterface {
  index: number
  item: any
}

export interface CardListProps extends ListProps {
  AvatarComponent?: any
  disableAvatar?: boolean
  items?: any[]
  map: {
    action?:
      | React.ReactElement
      | RenderPropsFunction<CardListRenderPropsInterface>
    avatar?: string
    subtitle?:
      | React.ReactNode
      | RenderPropsFunction<CardListRenderPropsInterface>
    title: React.ReactNode | RenderPropsFunction<CardListRenderPropsInterface>
  }
}

const CardList: React.FC<CardListProps> = (props) => {
  const { AvatarComponent, disableAvatar, items, map, sx, ...rest } = props

  return (
    <List
      sx={{
        '& .MuiListItemSecondaryAction-root': {
          display: 'flex',
        },
        ...sx,
      }}
      {...rest}
    >
      {items?.map((item, i) => {
        const isLast = items.length - 1 === i
        const renderProps = { index: i, item }

        const avatar = get(item, map.avatar as string)
        const title =
          typeof map.title === 'function'
            ? map.title(renderProps)
            : get(item, map.title as string, null)
        const subtitle =
          typeof map.subtitle === 'function'
            ? map.subtitle(renderProps)
            : get(item, map.subtitle as string, null)
        const { action } = map

        return (
          <ListItem
            alignItems="flex-start"
            divider={!isLast}
            key={`list-item-${i}`}
          >
            {!disableAvatar && (
              <ListItemAvatar>
                {avatar ? (
                  <AvatarComponent avatar={avatar} />
                ) : (
                  <Avatar>{title?.slice(0, 1)?.toUpperCase()}</Avatar>
                )}
              </ListItemAvatar>
            )}

            <ListItemText primary={title} secondary={subtitle} />

            {action && (
              <ListItemSecondaryAction>
                {typeof action === 'function' ? action(renderProps) : action}
              </ListItemSecondaryAction>
            )}
          </ListItem>
        )
      })}
    </List>
  )
}

export default CardList
