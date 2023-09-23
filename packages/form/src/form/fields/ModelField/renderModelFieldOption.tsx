import React from 'react'

import { Stack, Typography } from '@gravis-os/ui'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { getIsCreateOption } from './getIsCreateOption'
import { AutocompleteListDataItem } from './types'

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
    case isCreateOption: {
      return (
        <Stack
          alignItems="center"
          direction="row"
          spacing={0.5}
          sx={{ color: 'primary.main' }}
        >
          <AddOutlinedIcon fontSize="small" />
          <Typography color="inherit">{primitiveOptionValue}</Typography>
        </Stack>
      )
    }
    default: {
      return primitiveOptionValue
    }
  }
}
