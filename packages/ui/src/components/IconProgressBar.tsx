import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import React, { ReactNode } from 'react'
import Avatar from '../core/Avatar'
import Box from '../core/Box'
import Stack, { StackProps } from '../core/Stack'
import { renderReactNodeOrString } from '../utils'

/**
 * Used to indicate the current status of the progress bar item.
 *
 * @member Current
 * @member Completed
 */
export enum IconProgressBarItemStatus {
  Current,
  Completed,
  Default,
}

/**
 * Represents an Icon with Typography components and a horizontal line to the right of said components.
 * Boolean properties used to indicate the status of the progress bar.
 *
 * @prop {ReactNode} icon
 * @prop {ReactNode} title?
 * @prop {boolean} status?
 */
export interface IconProgressBarItemProps {
  /** The icon component to represent the progress bar item */
  icon: ReactNode
  /** The label displayed underneath the icon */
  title?: ReactNode
  /** Used to indicate the status of the progress bar item which affects styling */
  status?: IconProgressBarItemStatus
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
  const { icon, title, status } = iconProgressBarItem
  /**
   * Function used to return the correct color based on status
   * @returns The appropriate color based on current status of the icon progress item
   */
  const colorSelector = (): string => {
    switch (status) {
      case IconProgressBarItemStatus.Current:
        return 'primary.main'
      case IconProgressBarItemStatus.Completed:
        return 'success.light'
      default:
        return 'text.secondary'
    }
  }
  /**
   * Function used to return the correct background color based on status
   * @returns The appropriate background color based on current status of the icon progress item
   */
  const backgroundColorSelector = (): string => {
    switch (status) {
      case IconProgressBarItemStatus.Completed:
        return 'success.light'
      default:
        return 'transparent'
    }
  }

  return (
    <Stack spacing={1} alignItems="center" sx={{ width: 'fit-content' }}>
      <Avatar
        sx={{
          backgroundColor: backgroundColorSelector(),
          color: colorSelector(),
          borderColor: colorSelector(),
          border: 1,
        }}
      >
        {status === IconProgressBarItemStatus.Completed ? (
          <CheckOutlinedIcon sx={{ color: 'success.contrastText' }} />
        ) : (
          icon
        )}
      </Avatar>
      {renderReactNodeOrString(title, {
        variant: 'overline',
        color: colorSelector(),
      })}
    </Stack>
  )
}

const IconProgressBar: React.FC<IconProgressBarProps> = (
  props
): React.ReactElement => {
  const { items, ...rest } = props
  /**
   * Function used to return the correct bar color based on status
   * @returns The appropriate bar color based on current status of the icon progress item
   */
  const barColorSelector = (status: IconProgressBarItemStatus): string => {
    switch (status) {
      case IconProgressBarItemStatus.Current:
        return 'primary.main'
      case IconProgressBarItemStatus.Completed:
        return 'success.light'
      default:
        return 'text.disabled'
    }
  }
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
        const { status } = item
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
                  backgroundColor: barColorSelector(status),
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
