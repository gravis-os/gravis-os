import React from 'react'

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box, Tab, TabProps } from '@mui/material'

interface MegaSearchTabInterface {
  children: React.ReactNode
  label: string
  value: string
}

export interface MegaSearchTabsProps {
  tabs: MegaSearchTabInterface[]
}

const MegaSearchTabs: React.FC<MegaSearchTabsProps> = (props) => {
  const { tabs } = props

  const [value, setValue] = React.useState(tabs[0].value)
  const handleChange = (event: React.SyntheticEvent, newValue: string) =>
    setValue(newValue)

  const borderRadius = 4
  const tabListProps = {
    sx: {
      '& .MuiTab-root': {
        '&:first-of-type': { borderTopLeftRadius: borderRadius },
        '&:last-of-type': { borderTopRightRadius: borderRadius },
      },
    },
  }
  const tabProps: TabProps = {
    sx: {
      '&.Mui-selected': {
        backgroundColor: 'white',
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
      },
      backgroundColor: 'grey.200',
      textTransform: 'none',
    },
  }
  const tabPanelProps = {
    sx: { '&& > *': { borderTopLeftRadius: 0 }, padding: 0 },
  }

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <TabList onChange={handleChange} variant="scrollable" {...tabListProps}>
          {tabs.map((tab) => {
            const { label, value } = tab
            return <Tab key={value} label={label} value={value} {...tabProps} />
          })}
        </TabList>

        {tabs.map((tab) => {
          const { children, value } = tab
          return (
            <TabPanel key={value} value={value} {...tabPanelProps}>
              {children}
            </TabPanel>
          )
        })}
      </TabContext>
    </Box>
  )
}

export default MegaSearchTabs
