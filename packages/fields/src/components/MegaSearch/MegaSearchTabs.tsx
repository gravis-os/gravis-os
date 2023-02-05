import React from 'react'
import { Box, Tab, TabProps } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

interface MegaSearchTabInterface {
  value: string
  label: string
  children: React.ReactNode
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
      textTransform: 'none',
      backgroundColor: 'grey.200',
      '&.Mui-selected': {
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        backgroundColor: 'white',
      },
    },
  }
  const tabPanelProps = {
    sx: { padding: 0, '&& > *': { borderTopLeftRadius: 0 } },
  }

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <TabList onChange={handleChange} variant="scrollable" {...tabListProps}>
          {tabs.map((tab) => {
            const { value, label } = tab
            return <Tab key={value} value={value} label={label} {...tabProps} />
          })}
        </TabList>

        {tabs.map((tab) => {
          const { value, children } = tab
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
