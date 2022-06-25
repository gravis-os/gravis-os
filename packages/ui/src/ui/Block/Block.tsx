import React from 'react'
import isNil from 'lodash/isNil'
import { SxProps } from '@mui/material'
import BlockItem, { BlockItemProps } from './BlockItem'
import { ContainerProps } from '../Container'
import Box, { BoxProps } from '../Box'
import Stack, { StackProps } from '../Stack'

type GetBlockPaddingFunction = (props: SxProps) => SxProps

const getBlockPadding: GetBlockPaddingFunction = ({ pt, pb, py }) => {
  // Handle py: 0 gracefully while avoiding 0 from returning a false value
  if (py === 0) return { py }

  // Handle injected py immediately
  if (typeof py === 'number') return { py }

  const defaultPadding = { xs: 5, md: 15 }
  const defaultPy = { py: defaultPadding }

  // Handle case where pt/pb is provided without py. Manage overrides
  const hasPt = !isNil(pt)
  const hasPb = !isNil(pb)
  if (hasPt || hasPb) {
    return {
      ...(hasPt ? { pt } : { pt: defaultPadding }),
      ...(hasPb ? { pb } : { pb: defaultPadding }),
    }
  }

  // Default py value
  return defaultPy
}

export interface BlockProps extends Omit<BoxProps, 'maxWidth'> {
  items: BlockItemProps[]
  maxWidth?: ContainerProps['maxWidth']
  containerProps?: ContainerProps

  // Stack
  spacing?: StackProps['spacing']
  stackProps?: StackProps
}

const Block: React.FC<BlockProps> = (props) => {
  const {
    spacing,
    stackProps,
    pt,
    pb,
    py,
    items,
    sx,
    maxWidth,
    containerProps,
    ...rest
  } = props

  return (
    <Box
      reveal
      sx={{
        ...getBlockPadding({ pt, pb, py }),
        backgroundColor: 'background.paper',
        ...sx,
      }}
      {...rest}
    >
      <Stack spacing={spacing} {...stackProps}>
        {items.map((item, i) => {
          return (
            <BlockItem
              key={`block-item-${i}`}
              maxWidth={maxWidth}
              containerProps={containerProps}
              {...item}
            />
          )
        })}
      </Stack>
    </Box>
  )
}

export default Block
