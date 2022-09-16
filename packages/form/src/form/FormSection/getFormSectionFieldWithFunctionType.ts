import { FormSectionFieldRenderProps } from './getFormSectionFieldRenderProps'

export type FormSectionFieldWithFunctionType = (
  renderProps: FormSectionFieldRenderProps
) => string | number | readonly string[]

const getFormSectionFieldWithFunctionType = (
  userDefinedProp,
  renderProps: FormSectionFieldRenderProps
) => {
  return typeof userDefinedProp === 'function'
    ? userDefinedProp(renderProps)
    : userDefinedProp
}

export default getFormSectionFieldWithFunctionType
