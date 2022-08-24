import { FormSectionFieldBooleanFunction } from './renderField'

/**
 * Resolves a function to derive a boolean with blended use in formSection
 * Typically used to calculate a field's properties e.g. disabled, hidden, etc.
 * @param booleanOrFunctionProp
 * @param props
 */
const getFormSectionFieldBooleanFunction = (
  booleanOrFunctionProp: boolean | FormSectionFieldBooleanFunction,
  props
): boolean => {
  const { isNew, isPreview, formContext, crudContext, userContext } = props

  // Standard props for all boolean functions
  const formSectionFieldBooleanFunctionProps = {
    isNew,
    isPreview,
    isDetail: !isNew && !isPreview,
    formContext,
    crudContext,
    userContext,
    user: userContext?.user,
  }

  return Boolean(
    booleanOrFunctionProp &&
      (typeof booleanOrFunctionProp === 'function'
        ? (booleanOrFunctionProp as FormSectionFieldBooleanFunction)(
            formSectionFieldBooleanFunctionProps
          )
        : booleanOrFunctionProp)
  )
}

export default getFormSectionFieldBooleanFunction
