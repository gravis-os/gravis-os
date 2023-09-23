/* eslint-disable fp/no-mutation, no-unsanitized/property */

import React, { useEffect } from 'react'
import { useQuill } from 'react-quilljs'

import { Box } from '@gravis-os/ui'
import { useTheme } from '@mui/material/styles'
import startCase from 'lodash/startCase'

// Styles
const minHeight = 170
const borderRadius = 4

export interface HtmlFieldProps {
  basic?: boolean
  children?: React.ReactNode
  label?: string
  name: string
  onChange?: (value) => void
  placeholder?: string
  quillProps?: Record<string, unknown>
  // https://github.com/zenoamaro/react-quill/issues/317#issuecomment-877155420
  shouldQuillAutofocus?: boolean
  value: string
}

/**
 * Ensure to add the following to the downstream app file
 *
 * import 'react-quill/dist/quill.snow.css'
 *
 * @param props
 * @constructor
 */
const HtmlField: React.FC<HtmlFieldProps> = (props) => {
  const {
    basic,
    children,
    label,
    name,
    onChange,
    placeholder: injectedPlaceholder,
    quillProps,
    shouldQuillAutofocus = true,
    ...rest
  } = props
  const { value } = rest

  const placeholder = injectedPlaceholder || label || startCase(name)
  const basicModules = { toolbar: [['bold', 'italic', 'underline', 'link']] }

  const { quill: quillRef, quillRef: quillEditorRef } = useQuill({
    placeholder,
    ...(basic && { modules: basicModules }),
    ...quillProps,
  })

  // Set value (Do not listen to value as dep here)
  useEffect(() => {
    if (quillRef) {
      // Load with initialValue
      if (shouldQuillAutofocus) {
        quillRef.clipboard.dangerouslyPasteHTML(value)
      } else {
        quillRef.root.innerHTML = value
      }

      // Set value on keyboard change
      quillRef.on('text-change', (delta, oldDelta, source) => {
        const value = quillRef.root.innerHTML
        onChange(value)
      })
    }
  }, [quillRef, shouldQuillAutofocus])

  // Reset value
  useEffect(() => {
    if (quillRef && value === '') {
      if (shouldQuillAutofocus) {
        quillRef.clipboard.dangerouslyPasteHTML(value)
      } else {
        quillRef.root.innerHTML = value
      }
    }
  }, [quillRef, value, shouldQuillAutofocus])

  // Gotta useTheme because shorthand methods don't work on fill and stroke
  const theme = useTheme()
  const buttonColor = theme.palette.action.active
  const buttonHoverColor = theme.palette.primary.main

  return (
    <Box
      sx={{
        '& .ql-container': {
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
          borderColor: 'divider',
        },
        // Height
        '& .ql-editor': {
          color: 'currentColor',
          fontFamily: 'body1.fontFamily',
          minHeight,
        },
        // Font Size
        '& .ql-editor p': {
          fontSize: 'body1.fontSize',
          fontWeight: 'body1.fontWeight',
        },
        // Placeholder
        '& .ql-editor.ql-blank::before': {
          color: 'text.secondary',
          fontSize: 'body1.fontSize',
          fontStyle: 'normal',
        },
        // Button colors
        '& .ql-fill': { fill: buttonColor },
        '& .ql-picker-label::before': { color: buttonColor },
        '& .ql-stroke': { stroke: buttonColor },
        // Borders
        '& .ql-toolbar': {
          backgroundColor: 'background.default',
          borderColor: 'divider',
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
        },
        // Hover button colors
        '& .ql-toolbar button:hover .ql-fill': { fill: buttonHoverColor },
        '& .ql-toolbar button:hover .ql-picker-label::before': {
          color: buttonHoverColor,
        },
        '& .ql-toolbar button:hover .ql-stroke': { stroke: buttonHoverColor },
      }}
    >
      <div ref={quillEditorRef} {...rest} />
    </Box>
  )
}

export default HtmlField
