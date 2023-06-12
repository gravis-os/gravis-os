import React from 'react'
import { useLayout } from 'src/providers'
import { BlockItemProps } from 'src/web'

export interface RenderContactCalloutButtonBlockItemProps
  extends BlockItemProps {
  title?: string
  children?: JSX.Element
}

const renderContactCalloutButtonBlockItem = (
  props: RenderContactCalloutButtonBlockItemProps = {}
) => {
  const { site } = useLayout()
  const { title = 'Get Started', children = <></> } = props
  return {
    type: 'button',
    title,
    titleProps: {
      variant: 'contained' as const,
      color: 'primary' as const,
      dialogProps: {
        fullScreen: true,
        disableTitle: true,
        transitionVariant: 'fade' as const,
        children,
      },
    },
  }
}

export default renderContactCalloutButtonBlockItem
