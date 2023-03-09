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
  items?: NavConfigItem[]
}

export interface Option<T = string> {
  label: string
  value: T
}

export type Options<T = string> = Array<Option<T>>
