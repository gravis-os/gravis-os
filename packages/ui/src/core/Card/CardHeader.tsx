import React from 'react'

import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import {
  Divider,
  CardHeader as MuiCardHeader,
  CardHeaderProps as MuiCardHeaderProps,
} from '@mui/material'

import IconButton from '../IconButton'

export interface CardHeaderProps extends MuiCardHeaderProps {
  collapsed?: boolean
  collapsible?: boolean
  divider?: boolean
  onCollapsedClick?: () => void
  subtitle?: React.ReactNode
}

const CardHeader: React.FC<CardHeaderProps> = (props) => {
  const {
    action,
    collapsed,
    collapsible,
    divider,
    onCollapsedClick,
    subheader,
    subtitle,
    sx,
    ...rest
  } = props

  return (
    <>
      <MuiCardHeader
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
        subheader={subheader || subtitle}
        sx={{
          '& .MuiCardHeader-action': {
            marginRight: 0,
            marginTop: 0,
          },
          '& .MuiCardHeader-avatar': { alignSelf: 'flex-start' },
          p: 2,
          ...sx,
        }}
        {...rest}
      />

      {divider && <Divider />}
    </>
  )
}

export default CardHeader
