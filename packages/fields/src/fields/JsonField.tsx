import React from 'react'
import capitalize from 'lodash/capitalize'
import sortBy from 'lodash/sortBy'
import { GridProps, Box, Divider, Grid, Typography } from '@mui/material'
import { Control, FieldValues, UseFormSetValue } from 'react-hook-form'
import { CrudModule, Page } from '@gravis-os/types'
import { StorageAvatarWithUpload } from '@gravis-os/storage'
import ControlledHtmlField from './ControlledHtmlField'
import ControlledTextField from './ControlledTextField'

export interface JsonFieldProps {
  name: string
  control: Control
  value?: string | Page['sections']
  module: CrudModule
  setValue: UseFormSetValue<FieldValues>
}

export interface RenderJSONSectionArgs
  extends Omit<JsonFieldProps, 'sections'> {
  sections: Page['sections']
}

const renderJSONSection = (args: RenderJSONSectionArgs) => {
  const { name, control, sections, module, setValue } = args

  const SORT_ORDER = [
    'key',
    'overline',
    'title',
    'title2',
    'subtitle',
    'content',
    'items',
    'hero_src',
    'hero_alt',
    'avatar_src',
    'avatar_alt',
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
      if (isNestedItems) return ''
      const numberedKey = +key
      return Number.isNaN(numberedKey)
        ? capitalize(key)
        : `Item ${numberedKey + 1}`
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
                  case 'avatar_src':
                  case 'hero_src':
                    return (
                      <StorageAvatarWithUpload
                        editable
                        module={module}
                        onUpload={(savedFilePath) =>
                          setValue(sectionName, savedFilePath, {
                            shouldDirty: true,
                          })
                        }
                      />
                    )
                  case 'items':
                    return (
                      <Grid container spacing={1}>
                        {renderJSONSection({
                          name: sectionName,
                          control,
                          sections: sectionValue,
                          module,
                          setValue,
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

export const JsonField: React.FC<JsonFieldProps> = (props) => {
  const { name, control, value = '{}', module, setValue } = props

  const sections = typeof value === 'string' ? JSON.parse(value) : value

  // Handle degenerate case
  if (sections === null)
    return (
      <div>Schema is not ready yet. Please contact support to expedite.</div>
    )

  return (
    <Grid container spacing={3}>
      {renderJSONSection({ name, control, sections, module, setValue })}
    </Grid>
  )
}

export default JsonField
