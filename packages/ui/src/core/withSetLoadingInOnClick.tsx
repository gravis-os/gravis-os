import React, { useState } from 'react'

import { ButtonProps } from './Button'
import CircularProgress from './CircularProgress'

export type WithSetLoadingInOnClick = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  { setLoading }: { setLoading: React.Dispatch<React.SetStateAction<boolean>> }
) => void

const withSetLoadingInOnClick = (props) => (children) => {
  const { onClick } = props

  const [loading, setLoading] = useState(false)

  return React.cloneElement(children, {
    ...props,
    ...(onClick && {
      onClick: (e) => {
        onClick(e, { loading, setLoading })
      },
    }),
    ...(loading && { children: <CircularProgress size={16} /> }),
  } as ButtonProps)
}

export default withSetLoadingInOnClick
