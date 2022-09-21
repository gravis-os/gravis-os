// these imports are something you'd normally configure Jest to import for you
// automatically. Learn more in the setup docs: https://testing-library.com/docs/react-testing-library/setup#cleanup
import '@testing-library/jest-dom'
import * as React from 'react'
import { render, screen } from '@testing-library/react'
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
