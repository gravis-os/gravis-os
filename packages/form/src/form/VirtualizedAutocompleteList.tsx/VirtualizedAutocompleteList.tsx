import React from 'react'
import { VariableSizeList, ListChildComponentProps } from 'react-window'
import get from 'lodash/get'
import { useResetCache } from './hooks/useResetCache'
import {
  CHARACTERS_PER_LINE,
  LISTBOX_PADDING,
  MAX_VISIBLE_ITEM_COUNT,
  VIRTUALIZED_LIST_ITEM_SIZE,
} from './constants'
import { AutocompleteListDataItem } from '../../types'
import { renderOptionFromListDataItem } from '../utils/renderModelFieldOption'

const OuterElementContext = React.createContext({})
const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

const renderOption = (optionProps: ListChildComponentProps) => {
  const { data, index, style } = optionProps
  const dataSet = data[index]
  const props = dataSet[0] ?? {}
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  }

  return (
    <li {...props} style={inlineStyle}>
      {renderOptionFromListDataItem(dataSet)}
    </li>
  )
}

export const VirtualizedAutocompleteList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>((props, ref) => {
  const { children, ...other } = props
  const itemData = children as AutocompleteListDataItem[]
  const itemCount = itemData.length
  const itemSize = VIRTUALIZED_LIST_ITEM_SIZE

  const getItemSize = (index: number) => {
    const data = itemData[index]
    const content = get(data[1], data[2]) as string

    return Math.ceil(content.length / CHARACTERS_PER_LINE) * itemSize
  }

  const getHeight = () => {
    if (itemCount > MAX_VISIBLE_ITEM_COUNT) {
      return MAX_VISIBLE_ITEM_COUNT * itemSize
    }

    return itemData
      .map((_, index) => getItemSize(index))
      .reduce((a, b) => a + b, 0)
  }
  const gridRef = useResetCache(itemCount)

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={getItemSize}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderOption}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  )
})
