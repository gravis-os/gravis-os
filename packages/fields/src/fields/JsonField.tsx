import React, { useEffect, useState } from 'react'
import { Control, FieldValues, UseFormSetValue } from 'react-hook-form'

import { StorageAvatarWithUpload } from '@gravis-os/storage'
import { CrudModule, Page } from '@gravis-os/types'
import { Button, Stack } from '@gravis-os/ui'
import { Box, Divider, Grid, GridProps, Typography } from '@mui/material'
import capitalize from 'lodash/capitalize'
import sortBy from 'lodash/sortBy'
import Prism from 'prismjs'

import ControlledHtmlField from './ControlledHtmlField'
import ControlledTextField from './ControlledTextField'
import TextField from './TextField'

export interface JsonFieldProps {
  control: Control
  module: CrudModule
  name: string
  setValue: UseFormSetValue<FieldValues>
  value?: Page['sections'] | string
}

export interface RenderJSONSectionArgs
  extends Omit<JsonFieldProps, 'sections'> {
  sections: Page['sections']
}

const renderJSONSection = (args: RenderJSONSectionArgs) => {
  const { control, module, name, sections, setValue } = args

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
        case isNestedItems: {
          return 12
        }
        case isItems: {
          const columnsBySection = 12 / sectionEntries.length
          const isColumnTooSmall = columnsBySection < 3
          return isColumnTooSmall ? 6 : columnsBySection
        }
        default: {
          return 12
        }
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
      <Grid item key={key} xs={columnWidth as GridProps['xs']}>
        <Box mt={columnMarginTop}>
          <Typography align="center" variant={isItems ? 'h6' : 'h5'}>
            {columnLabel}
          </Typography>

          <Grid container spacing={columnGridSpacing}>
            {sortedSectionKeys.map((sectionKey, j) => {
              const sectionValue = section[sectionKey]
              const sectionName = Array.isArray(sections)
                ? `${name}[${i}].[${sectionKey}]`
                : `${name}.[${key}].[${sectionKey}]`
              const renderFieldContent = (sectionKey: string) => {
                switch (sectionKey) {
                  case 'avatar_src':
                  case 'hero_src': {
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
                  }
                  case 'items': {
                    return (
                      <Grid container spacing={1}>
                        {renderJSONSection({
                          control,
                          module,
                          name: sectionName,
                          sections: sectionValue,
                          setValue,
                        })}
                      </Grid>
                    )
                  }
                  case 'html': {
                    return (
                      <ControlledHtmlField
                        control={control}
                        name={sectionName}
                      />
                    )
                  }
                  default: {
                    return (
                      <ControlledTextField
                        control={control}
                        defaultValue={sectionValue}
                        hidden={sectionKey === 'key'}
                        label={capitalize(sectionKey)}
                        name={sectionName}
                        rows={null}
                      />
                    )
                  }
                }
              }

              return (
                <Grid item key={sectionValue} xs={12}>
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
  const { control, module, name, setValue, value = '{}' } = props

  const [isAdvancedEditMode, setIsAdvancedEditMode] = useState(false)
  const toggleAdvancedEditMode = () =>
    setIsAdvancedEditMode(!isAdvancedEditMode)

  const [objectValue, setObjectValue] = useState<Page['sections']>({})

  const getSectionsFromValue = (value: string) => {
    try {
      return JSON.parse(value)
    } catch {
      return {}
    }
  }

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  // Handle degenerate case
  if (objectValue === null)
    return (
      <div>Schema is not ready yet. Please contact support to expedite.</div>
    )

  return (
    <Stack>
      <Button onClick={toggleAdvancedEditMode}>
        {isAdvancedEditMode ? 'Normal' : 'Advanced'} Edit Modee
      </Button>
      {isAdvancedEditMode ? (
        <div style={{ position: 'relative' }}>
          <TextField
            {...props}
            inputProps={{
              sx: {
                caretColor: 'black',
                color: 'transparent',
                fontFamily: 'monospace',
                lineHeight: 1.5,
              },
            }}
            multiline
            spellCheck="false"
            value={typeof value === 'string' ? value : JSON.stringify(value)}
          />
          <pre
            id="highlighting"
            style={{
              left: 0,
              margin: 0,
              paddingBottom: 16.5,
              paddingLeft: 14,
              paddingRight: 14,
              paddingTop: 16.5,
              pointerEvents: 'none',
              position: 'absolute',
              top: 0,
              whiteSpace: 'pre-wrap',
              width: '100%',
              wordWrap: 'break-word',
            }}
          >
            <code className="language-javascript" id="highlighting-content">
              {typeof value === 'string' ? value : JSON.stringify(value)}
            </code>
          </pre>
        </div>
      ) : (
        renderJSONSection({
          control,
          module,
          name,
          sections:
            typeof value === 'string' ? getSectionsFromValue(value) : value,
          setValue,
        })
      )}
    </Stack>
  )
}

export default JsonField
