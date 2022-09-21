import { CheckOutlined } from '@mui/icons-material'
import React, { ReactNode } from 'react'
import { renderReactNodeOrString } from '../utils'
import Avatar from './Avatar'
import Box from './Box'
import Stack, { StackProps } from './Stack'

/**
 * Represents an Icon with Typography components and a horizontal line to the right of said components.
 * Boolean properties used to indicate the status of the progress bar.
 *
 * @prop {ReactNode} icon
 * @prop {ReactNode} title?
 * @prop {boolean} isCompleted?
 * @prop {boolean} isCurrent?
 */
export interface IconProgressBarItemProps {
  /** The icon component to represent the progress bar item */
  icon: ReactNode
  /** The label displayed underneath the icon */
  title?: ReactNode
  /** If set to true, will set the icon to a checkbox, and changes the color of both icon and title to success green */
  isCompleted?: boolean
  /** If set to true, will change the color to primary color */
  isCurrent?: boolean
}

/**
 * Represents the items to be displayed in the progress bar.
 *
 * @extends StackProps
 */
export interface IconProgressBarProps extends StackProps {
  /** List of items to be rendered */
  items: IconProgressBarItemProps[]
}

const IconProgressBarItem = (iconProgressBarItem: IconProgressBarItemProps) => {
  const {
    icon,
    title,
    isCompleted = false,
    isCurrent = false,
  } = iconProgressBarItem
  return (
    <Stack spacing={1} alignItems="center" sx={{ width: 'fit-content' }}>
      <Avatar
        sx={{
          backgroundColor: 'transparent',
          color: isCurrent ? 'primary.main' : 'text.secondary',
          borderColor: isCurrent ? 'primary.main' : 'text.secondary',
          border: 1,
        }}
      >
        {isCompleted ? <CheckOutlined /> : icon}
      </Avatar>
      {renderReactNodeOrString(title, {
        variant: 'overline',
        color: isCurrent ? 'primary' : 'text.secondary',
      })}
    </Stack>
  )
}

const IconProgressBar: React.FC<IconProgressBarProps> = (
  props
): React.ReactElement => {
  const { items, ...rest } = props
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      {items.map((item, i) => {
        const iconProgressBarItemProps = {
          ...item,
        }
        const { isCurrent } = item
        return (
          <>
            {/* Progress Item */}
            <IconProgressBarItem {...iconProgressBarItemProps} />
            {/* Horizontal Line */}
            {i !== items.length - 1 && (
              <Box
                height={2}
                width="100%"
                sx={{
                  // Set color to primary if it is the current step
                  backgroundColor: isCurrent ? 'primary.main' : 'text.disabled',
                  // Margin -3 to move the line up to the icons instead of in between the icon and text
                  mt: -3,
                  mx: 3,
                }}
              />
            )}
          </>
        )
      })}
    </Stack>
  )
}

export default IconProgressBar
