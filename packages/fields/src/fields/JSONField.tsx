import React from 'react'
import capitalize from 'lodash/capitalize'
import sortBy from 'lodash/sortBy'
import { GridProps, Box, Divider, Grid, Typography } from '@mui/material'
import { Control } from 'react-hook-form'
import { Page } from '@gravis-os/types'
import ControlledHtmlField from './ControlledHtmlField'
import ControlledTextField from './ControlledTextField'

export interface JSONFieldProps {
  name: string
  control: Control
  value?: string | Page['sections']
}

export interface RenderJSONSectionArgs
  extends Omit<JSONFieldProps, 'sections'> {
  sections: Page['sections']
}

const renderJSONSection = (args: RenderJSONSectionArgs) => {
  const { name, control, sections } = args

  const SORT_ORDER = [
    'key',
    'overline',
    'title',
    'title2',
    'subtitle',
    'content',
    'items',
    'html',
  ]

  const sectionEntries = Object.entries(sections)

  return sectionEntries.map(([key, section], i) => {
    const sectionKeys = Object.keys(section)
    const sortedSectionKeys = sortBy(sectionKeys, (sectionKey) =>
      SORT_ORDER.indexOf(sectionKey)
    )
    const isItems = name.includes('items')
    const isNestedItems = name.split('items').length > 2
    const isLast = sectionEntries.length - 1 === i
    const isShowDivider = !isItems && !isLast

    // Calculate column information
    const getColumnWidth = () => {
      switch (true) {
        case isNestedItems:
          return 12
        case isItems:
          const columnsBySection = 12 / sectionEntries.length
          const isColumnTooSmall = columnsBySection < 3
          return isColumnTooSmall ? 6 : columnsBySection
        default:
          return 12
      }
    }
    const getColumnLabel = () => {
      return isNestedItems ? '' : capitalize(key)
    }
    const getColumnMarginTop = () => {
      return isNestedItems ? 0 : 2
    }
    const getColumnGridSpacing = () => {
      return isNestedItems ? 0 : 2
    }
    const columnWidth = getColumnWidth()
    const columnLabel = getColumnLabel()
    const columnMarginTop = getColumnMarginTop()
    const columnGridSpacing = getColumnGridSpacing()

    return (
      <Grid item xs={columnWidth as GridProps['xs']} key={key}>
        <Box mt={columnMarginTop}>
          <Typography variant={isItems ? 'h6' : 'h5'} align="center">
            {columnLabel}
          </Typography>

          <Grid container spacing={columnGridSpacing}>
            {sortedSectionKeys.map((sectionKey, j) => {
              const sectionValue = section[sectionKey]
              const sectionName = Array.isArray(sections)
                ? `${name}[${i}].[${sectionKey}]`
                : `${name}.[${key}].[${sectionKey}]`
              if (!SORT_ORDER.includes(sectionKey)) return <></>
              const renderFieldContent = (sectionKey: string) => {
                switch (sectionKey) {
                  case 'items':
                    return (
                      <Grid container spacing={1}>
                        {renderJSONSection({
                          name: sectionName,
                          control,
                          sections: sectionValue,
                        })}
                      </Grid>
                    )
                  case 'html':
                    return (
                      <ControlledHtmlField
                        control={control}
                        name={sectionName}
                      />
                    )
                  default:
                    return (
                      <ControlledTextField
                        control={control}
                        name={sectionName}
                        label={capitalize(sectionKey)}
                        defaultValue={sectionValue}
                        hidden={sectionKey === 'key'}
                        rows={null}
                      />
                    )
                }
              }

              return (
                <Grid item xs={12} key={sectionValue}>
                  {renderFieldContent(sectionKey)}
                </Grid>
              )
            })}
          </Grid>

          {isShowDivider && (
            <Box mt={6}>
              <Divider />
            </Box>
          )}
        </Box>
      </Grid>
    )
  })
}

export const JSONField: React.FC<JSONFieldProps> = (props) => {
  const { name, control, value = '{}' } = props

  const sections = typeof value === 'string' ? JSON.parse(value) : value

  // Handle degenerate case
  if (sections === null)
    return (
      <div>Schema is not ready yet. Please contact support to expedite.</div>
    )

  return (
    <Grid container spacing={3}>
      {renderJSONSection({ name, control, sections })}
    </Grid>
  )
}

export default JSONField
