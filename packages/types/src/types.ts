export type AppProps = {
  text?: string
  description?: string
}

export type RenderPropsFunction<RenderProps> = (
  renderProps: RenderProps
) => React.ReactElement | null

// ==============================
// Nav
// ==============================
export interface NavConfigItem {
  key: string
}
