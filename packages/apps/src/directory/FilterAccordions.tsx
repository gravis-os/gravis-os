import React from 'react'
import { Box } from '@gravis-os/ui'
import FilterAccordion from './FilterAccordion'
import { UseFilterDefsReturn } from './useFilterDefs'

export interface FilterAccordionsProps {
  useFilterDefsProps: UseFilterDefsReturn
}

const FilterAccordions: React.FC<FilterAccordionsProps> = (props) => {
  const { useFilterDefsProps } = props

  const { filterChips, filterDefs, getHasFilterChip } = useFilterDefsProps

  return (
    <Box
      sx={{
        overflow: 'auto',
        height: (theme) => `calc(100vh - ${theme.spacing(8)})`,
        /* Remove scrollbar space */
        '&::-webkit-scrollbar': {
          width: 0,
          background: 'transparent',
        },
      }}
    >
      {filterDefs?.map((filterDef) => {
        const { key, name } = filterDef

        const defaultExpanded = getHasFilterChip(name) || true

        const filterChipsWithCurrentFilterItemName = filterChips.filter(
          (filterChip) => filterChip.key === name
        )

        const activeOptionLabels = filterChipsWithCurrentFilterItemName
          .map(({ value }) => value)
          .flat()

        return (
          <FilterAccordion
            key={key}
            activeOptionLabels={activeOptionLabels}
            useFilterDefsProps={useFilterDefsProps}
            accordionProps={{ defaultExpanded }}
            {...filterDef}
          />
        )
      })}
    </Box>
  )
}

export default FilterAccordions
