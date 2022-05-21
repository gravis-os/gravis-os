import React from 'react'

import { Pages } from './Pages'
import { Layout } from './Page'

export default {
  title: 'ui/Sortable',
}

export const Horizontal = () => <Pages layout={Layout.Horizontal} />

export const Vertical = () => <Pages layout={Layout.Vertical} />

export const Grid = () => <Pages layout={Layout.Grid} />
