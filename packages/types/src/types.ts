export type AppProps = {
  description?: string
  text?: string
}

export type RenderPropsFunction<RenderProps> = (
  renderProps: RenderProps
) => React.ReactElement | null

// ==============================
// Nav
// ==============================
export interface NavConfigItem {
  items?: NavConfigItem[]
  key: string
}

export interface Option<T = string> {
  label: string
  value: T
}

export type Options<T = string> = Array<Option<T>>
