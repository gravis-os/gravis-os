import React from 'react'
import get from 'lodash/get'
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListProps,
} from '@mui/material'
import { RenderPropsFunction } from '../../types'

interface CardListRenderPropsInterface {
  item: any
  index: number
}

export interface CardListProps extends ListProps {
  items?: any[]
  map: {
    avatar?: string
    title: RenderPropsFunction<CardListRenderPropsInterface> | React.ReactNode
    subtitle?:
      | RenderPropsFunction<CardListRenderPropsInterface>
      | React.ReactNode
    action?:
      | RenderPropsFunction<CardListRenderPropsInterface>
      | React.ReactElement
  }
  disableAvatar?: boolean
  AvatarComponent?: any
}

const CardList: React.FC<CardListProps> = props => {
  const { items, map, disableAvatar, sx, AvatarComponent, ...rest } = props

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
        const renderProps = { item, index: i }

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
            key={`list-item-${i}`}
            alignItems="flex-start"
            divider={!isLast}
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
