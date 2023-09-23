import { RenderFieldProps } from './renderField'

export interface FormSectionFieldRenderProps {
  crudContext: RenderFieldProps['crudContext']
  formContext: RenderFieldProps['formContext']
  isDetail: boolean
  isNew: RenderFieldProps['sectionProps']['isNew']
  isPreview: RenderFieldProps['sectionProps']['isPreview']
  user: RenderFieldProps['userContext']['user']
  userContext: RenderFieldProps['userContext']
}

// Standard renderProp used in all function types in the fieldDef object
const getFormSectionFieldRenderProps = (
  props: RenderFieldProps
): FormSectionFieldRenderProps => {
  const { crudContext, formContext, sectionProps, userContext } = props
  const { isNew, isPreview } = sectionProps

  return {
    crudContext,
    formContext,
    isDetail: !isNew && !isPreview,
    isNew,
    isPreview,
    user: userContext?.user,
    userContext,
  }
}

export default getFormSectionFieldRenderProps
