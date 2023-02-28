import type { Theme } from '@mui/material'

export interface GravisConfig {
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
  mui: {
    theme: {
      light: Theme
      dark: Theme
    }
  }
}
