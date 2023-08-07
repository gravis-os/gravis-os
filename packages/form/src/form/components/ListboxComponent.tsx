import React from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { VariableSizeList, ListChildComponentProps } from 'react-window'
import { JsxElement } from 'typescript'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { Stack, Typography } from '@gravis-os/ui'
import { getIsCreateOption } from '../utils/getIsCreateOption'
import { useResetCache } from '../VirtualizedAutocompleteList.tsx/hooks/useResetCache'

const LISTBOX_PADDING = 8
const OuterElementContext = React.createContext({})
const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

const renderOption = (optionProps: ListChildComponentProps) => {
  const { data, index, style } = optionProps
  const dataSet = data[index]
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  }
  const [props, option, pk, displayValue, renderOption] = dataSet
  const shouldSkipOption =
    isEmpty(option) ||
    Array.isArray(option) ||
    typeof option !== 'object' ||
    (Array.isArray(displayValue) &&
      displayValue.find((value) => value?.id === option?.id))
  const isCreateOption = getIsCreateOption({ option, pk })

  // Handle degenerate case where option is an empty object
  if (shouldSkipOption) return null

  // Careful, option might be null
  const primitiveOptionValue: React.ReactNode = renderOption
    ? renderOption({ option, pk })
    : (get(option, pk) as string)

  switch (true) {
    case isCreateOption:
      return (
        <li {...props}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{ color: 'primary.main' }}
          >
            <AddOutlinedIcon fontSize="small" />
            <Typography color="inherit" style={inlineStyle}>
              {primitiveOptionValue}
            </Typography>
          </Stack>
        </li>
      )
    default:
      return (
        <li {...props} style={inlineStyle}>
          {primitiveOptionValue}
        </li>
      )
  }
}

export const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>((props, ref) => {
  const { children, ...other } = props
  const itemData = children as JsxElement[]
  const itemCount = itemData.length
  const itemSize = 36

  const getItemSize = (index: number) => {
    const data = itemData[index]
    const content = get(data[1], data[2]) as string

    return Math.ceil(content.length / 25) * itemSize
  }

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize
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
