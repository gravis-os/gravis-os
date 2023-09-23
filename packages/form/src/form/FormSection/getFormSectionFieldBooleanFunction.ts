import { FormSectionFieldRenderProps } from './getFormSectionFieldRenderProps'

export type FormSectionFieldBooleanFunction = (
  renderProps: FormSectionFieldRenderProps
) => boolean

/**
 * Resolves a function to derive a boolean with blended use in formSection
 * Typically used to calculate a field's properties e.g. disabled, hidden, etc.
 * @param booleanOrFunctionProp
 * @param renderProps
 */
const getFormSectionFieldBooleanFunction = (
  booleanOrFunctionProp: FormSectionFieldBooleanFunction | boolean,
  renderProps: FormSectionFieldRenderProps
): boolean => {
  return Boolean(
    booleanOrFunctionProp &&
      (typeof booleanOrFunctionProp === 'function'
        ? (booleanOrFunctionProp as FormSectionFieldBooleanFunction)(
            renderProps
          )
        : booleanOrFunctionProp)
  )
}

export default getFormSectionFieldBooleanFunction
