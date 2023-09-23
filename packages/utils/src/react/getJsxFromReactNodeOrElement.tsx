import React from 'react'

export type ReactNodeOrElement =
  | React.JSXElementConstructor<unknown>
  | React.ReactNode

/**
 * Move to gravis
 * @param item
 */
const getJsxFromReactNodeOrElement = (
  item: ReactNodeOrElement,
  itemProps = {}
): React.ReactNode | undefined => {
  const shouldRender = item && typeof item === 'object'
  if (!shouldRender) return

  const isReactNode = React.isValidElement(item)
  if (isReactNode) return item

  const Item = item as unknown as React.JSXElementConstructor<unknown>
  return <Item {...itemProps} />
}

export default getJsxFromReactNodeOrElement
