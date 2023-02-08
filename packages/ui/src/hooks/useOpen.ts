import { useState } from 'react'

const useOpen = (
  injectedOpen?: boolean,
  injectedSetOpen?: React.Dispatch<React.SetStateAction<boolean>>
): [
  boolean,
  {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    open: () => void
    close: () => void
    toggle: () => void
  }
] => {
  const initialOpen = typeof injectedOpen === 'boolean' ? injectedOpen : false
  const [isOpen, localSetIsOpen] = useState<boolean>(initialOpen)
  const setIsOpen = injectedSetOpen || localSetIsOpen

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(!isOpen)

  return [isOpen, { setIsOpen, open, close, toggle }]
}

export default useOpen
