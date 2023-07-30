import React, { useEffect } from 'react'
import startCase from 'lodash/startCase'
import { useTheme } from '@mui/material/styles'
import { useQuill } from 'react-quilljs'
import { Box } from '@gravis-os/ui'

// Styles
const minHeight = 170
const borderRadius = 4

export interface HtmlFieldProps {
  name: string
  label?: string
  placeholder?: string
  children?: React.ReactNode
  onChange?: (value) => void
  value: string
  quillProps?: Record<string, unknown>
  basic?: boolean
  // https://github.com/zenoamaro/react-quill/issues/317#issuecomment-877155420
  shouldQuillAutofocus?: boolean
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
    children,
    name,
    label,
    placeholder: injectedPlaceholder,
    onChange,
    quillProps,
    basic,
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
    if (quillRef) {
      if (value === '') {
        if (shouldQuillAutofocus) {
          quillRef.clipboard.dangerouslyPasteHTML(value)
        } else {
          quillRef.root.innerHTML = value
        }
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
          backgroundColor: 'background.default',
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
