import React, { ReactNode } from 'react'
import Box, { BoxProps } from '../core/Box'

/**
 * Represents the action footer component.
 *
 * @extends BoxProps
 * @prop {ReactNode[]} actions
 */
export interface ActionFooterProps extends BoxProps {
  /** List of ReactNodes to be rendered */
  actions: ReactNode[]
}

/**
 * Padding and height exported for other components to use to pad content above the sticky footer
 */
export const ACTION_FOOTER_HEIGHT = 65
export const ACTION_FOOTER_PADDING = '65px'

/**
 * Renders a sticky Box component located at the bottom of the page containing structured actions spread evenly.
 * The component is rendered with a fixed height to enable padding of other components above it.
 * @param props List of actions
 * @returns ReactElement to be rendered
 */
const ActionFooter: React.FC<ActionFooterProps> = (
  props
): React.ReactElement => {
  const { actions, ...rest } = props
  return (
    <Box
      sx={{
        justifyContent: actions.length > 1 ? 'space-between' : 'center',
        alignItems: 'center',
        bottom: 0,
        p: 2,
        position: 'fixed',
        width: '100vw',
        height: ACTION_FOOTER_HEIGHT,
        display: 'flex',
        backgroundColor: 'white',
        boxShadow: '1px 5px 8px #121828',
      }}
      {...rest}
    >
      {actions.map((action) => action)}
    </Box>
  )
}

export default ActionFooter
