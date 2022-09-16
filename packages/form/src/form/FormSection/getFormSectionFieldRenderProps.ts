import { RenderFieldProps } from './renderField'

export interface FormSectionFieldRenderProps {
  isNew: RenderFieldProps['sectionProps']['isNew']
  isPreview: RenderFieldProps['sectionProps']['isPreview']
  isDetail: boolean
  formContext: RenderFieldProps['formContext']
  crudContext: RenderFieldProps['crudContext']
  userContext: RenderFieldProps['userContext']
  user: RenderFieldProps['userContext']['user']
}

// Standard renderProp used in all function types in the fieldDef object
const getFormSectionFieldRenderProps = (
  props: RenderFieldProps
): FormSectionFieldRenderProps => {
  const { sectionProps, formContext, crudContext, userContext } = props
  const { isNew, isPreview } = sectionProps

  return {
    isNew,
    isPreview,
    isDetail: !isNew && !isPreview,
    formContext,
    crudContext,
    userContext,
    user: userContext?.user,
  }
}

export default getFormSectionFieldRenderProps
