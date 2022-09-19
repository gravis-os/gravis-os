import React, { ReactNode } from 'react'
import Box, { BoxProps } from './Box'

/**
 * Represents the action footer component
 */
export interface ActionFooterProps extends BoxProps {
  /** List of ReactNodes to be rendered */
  actions: ReactNode[]
}

/**
 * Renders a Box component located at the bottom of the page containing structured actions spread evenly.
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
        mt: 2,
        display: 'flex',
        backgroundColor: 'white',
        boxShadow: 3,
      }}
      {...rest}
    >
      {actions.map((action) => action)}
    </Box>
  )
}

export default ActionFooter
