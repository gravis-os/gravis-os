import React from 'react'
import startCase from 'lodash/startCase'
import { useTheme } from '@mui/material/styles'
import { useQuill } from 'react-quilljs'
import Box from '../ui/Box'

// Styles
const minHeight = 170
const borderRadius = 4

export interface HtmlFieldProps {
  name?: string
  label?: string
  placeholder?: string
  children?: React.ReactNode
  onChange?: (value) => void
}

const HtmlField: React.FC<HtmlFieldProps> = props => {
  const { children, name, label, placeholder, onChange, ...rest } = props

  const { quill: quillRef, quillRef: quillEditorRef } = useQuill({
    placeholder: placeholder || label || startCase(name),
  })

  React.useEffect(() => {
    if (quillRef) {
      quillRef.on('text-change', (delta, oldDelta, source) => {
        const value = quillRef.root.innerHTML
        onChange(value)
      })
    }
  }, [quillRef])

  // Gotta useTheme because shorthand methods don't work on fill and stroke
  const theme = useTheme()
  const buttonColor = theme.palette.action.active
  const buttonHoverColor = theme.palette.primary.main

  return (
    <Box
      sx={{
        // Height
        '& .ql-editor': {
          minHeight,
          fontFamily: 'body1.fontFamily',
          color: 'currentColor',
        },
        // Borders
        '& .ql-toolbar': {
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          borderColor: 'divider',
        },
        '& .ql-container': {
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
          borderColor: 'divider',
        },
        // Button colors
        '& .ql-fill': { fill: buttonColor },
        '& .ql-stroke': { stroke: buttonColor },
        '& .ql-picker-label::before': { color: buttonColor },
        // Hover button colors
        '& .ql-toolbar button:hover .ql-fill': { fill: buttonHoverColor },
        '& .ql-toolbar button:hover .ql-stroke': { stroke: buttonHoverColor },
        '& .ql-toolbar button:hover .ql-picker-label::before': {
          color: buttonHoverColor,
        },
        // Placeholder
        '& .ql-editor.ql-blank::before': {
          fontSize: 'body1.fontSize',
          color: 'text.secondary',
          fontStyle: 'normal',
        },
        // Font Size
        '& .ql-editor p': {
          fontWeight: 'body1.fontWeight',
          fontSize: 'body1.fontSize',
        },
      }}
    >
      <div ref={quillEditorRef} {...rest} />
    </Box>
  )
}

export default HtmlField
