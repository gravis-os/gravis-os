import type { Theme } from '@mui/material'

export interface GravisConfig {
  mui: {
    theme: {
      dark: Theme
      light: Theme
    }
  }
  /**
   * NextJS config
   */
  next: {
    /**
     * Next version
     * @default 12
     */
    version: number
  }
}
