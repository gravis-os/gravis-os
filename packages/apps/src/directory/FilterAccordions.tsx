import React from 'react'

import { UseFilterDefsReturn } from '@gravis-os/query'
import { Box } from '@gravis-os/ui'

import FilterAccordion from './FilterAccordion'

export interface FilterAccordionsProps {
  useFilterDefsProps: UseFilterDefsReturn
}

const FilterAccordions: React.FC<FilterAccordionsProps> = (props) => {
  const { useFilterDefsProps } = props

  const { filterChips, filterDefs, getHasFilterChip } = useFilterDefsProps

  return (
    <Box
      sx={{
        /* Remove scrollbar space */
        '&::-webkit-scrollbar': {
          background: 'transparent',
          width: 0,
        },
        height: (theme) => `calc(100vh - ${theme.spacing(8)})`,
        overflow: 'auto',
      }}
    >
      {filterDefs?.map((filterDef) => {
        const { key, name } = filterDef

        const defaultExpanded = getHasFilterChip(name) || true

        const filterChipsWithCurrentFilterItemName = filterChips.filter(
          (filterChip) => filterChip.key === name
        )

        const activeOptionLabels = filterChipsWithCurrentFilterItemName.flatMap(
          ({ value }) => value
        )

        return (
          <FilterAccordion
            accordionProps={{ defaultExpanded }}
            activeOptionLabels={activeOptionLabels}
            key={key}
            useFilterDefsProps={useFilterDefsProps}
            {...filterDef}
          />
        )
      })}
    </Box>
  )
}

export default FilterAccordions
