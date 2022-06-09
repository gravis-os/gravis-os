import React from 'react'
import {
  CardHeader as MuiCardHeader,
  CardHeaderProps as MuiCardHeaderProps,
  Divider,
} from '@mui/material'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'
import IconButton from '../IconButton'

export interface CardHeaderProps extends MuiCardHeaderProps {
  divider?: boolean
  collapsed?: boolean
  collapsible?: boolean
  onCollapsedClick?: () => void
}

const CardHeader: React.FC<CardHeaderProps> = (props) => {
  const {
    action,
    collapsed,
    collapsible,
    onCollapsedClick,
    sx,
    divider,
    ...rest
  } = props

  return (
    <>
      <MuiCardHeader
        sx={{
          p: 2,
          '& .MuiCardHeader-action': {
            marginTop: 0,
            marginRight: 0,
          },
          '& .MuiCardHeader-avatar': { alignSelf: 'flex-start' },
          ...sx,
        }}
        action={
          <>
            {action}

            {collapsible && (
              <IconButton onClick={onCollapsedClick}>
                {collapsed ? (
                  <ExpandLessOutlinedIcon />
                ) : (
                  <ExpandMoreOutlinedIcon />
                )}
              </IconButton>
            )}
          </>
        }
        {...rest}
      />

      {divider && <Divider />}
    </>
  )
}

export default CardHeader
