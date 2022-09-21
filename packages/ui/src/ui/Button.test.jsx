import React from 'react'
import { render, screen } from '../../test-utils'
import Button from './Button'

test('Button renders its children content on the screen via the children prop', () => {
  const testMessage = 'Test Message'
  render(<Button>{testMessage}</Button>)

  // .toBeInTheDocument() is an assertion that comes from jest-dom
  // otherwise you could use .toBeDefined()
  expect(screen.getByText(testMessage)).toBeInTheDocument()
})

test('Button renders its children content on the screen via the title prop', () => {
  const testMessage = 'Test Message'
  render(<Button title={testMessage} />)

  expect(screen.getByText(testMessage)).toBeInTheDocument()
})
