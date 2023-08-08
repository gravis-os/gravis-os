import React from 'react'
import { Stack, Typography } from '@gravis-os/ui'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { AutocompleteListDataItem } from '../fields/types'
import { getIsCreateOption } from '../fields/getIsCreateOption'

export const renderOptionFromListDataItem = (
  dataSet: AutocompleteListDataItem
) => {
  const [_, option, pk, displayValue, renderOption] = dataSet
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
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ color: 'primary.main' }}
        >
          <AddOutlinedIcon fontSize="small" />
          <Typography color="inherit">{primitiveOptionValue}</Typography>
        </Stack>
      )
    default:
      return primitiveOptionValue
  }
}
