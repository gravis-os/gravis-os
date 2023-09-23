import React from 'react'

import { BlockItemProps } from '../web/Block/BlockItem'

export interface RenderContactCalloutButtonBlockItemProps
  extends BlockItemProps {
  children?: JSX.Element
  title?: string
}

const renderContactCalloutButtonBlockItem = (
  props: RenderContactCalloutButtonBlockItemProps = {}
) => {
  const { title = 'Get Started', children = <></> } = props
  return {
    title,
    titleProps: {
      color: 'primary' as const,
      dialogProps: {
        children,
        disableTitle: true,
        fullScreen: true,
        transitionVariant: 'fade' as const,
      },
      variant: 'contained' as const,
    },
    type: 'button',
  }
}

export default renderContactCalloutButtonBlockItem
