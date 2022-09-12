import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { CircularProgress, ButtonProps } from '@gravis-os/ui'
import {
  FormSections,
  Form,
  FormProps,
  FormSectionsProps,
  FormRenderPropsInterface,
} from '@gravis-os/form'
import { CrudItem, CrudModule } from '@gravis-os/types'
import { UserContextInterface, useUser } from '@gravis-os/auth'
import useCrudForm, { UseCrudFormArgs, UseCrudFormReturn } from './useCrudForm'
import DetailPageHeader, { DetailPageHeaderProps } from './DetailPageHeader'
import metaFormSection from './metaFormSection'
import CrudFormProvider from '../providers/CrudFormProvider'
import useCrud from './useCrud'
import { CrudContextInterface } from './CrudContext'

type HiddenFunction = ({
  isNew,
  isPreview,
}: {
  isNew: boolean
  isPreview: boolean
}) => boolean

export interface CrudFormProps {
  item?: CrudItem // Typically gets injected via DetailPage cloneElement
  setItem?: React.Dispatch<React.SetStateAction<CrudItem>> // Typically gets injected via DetailPage cloneElement
  disableHeader?: boolean
  sections: FormSectionsProps['sections']
  module: CrudModule
  useCrudFormProps?: Partial<UseCrudFormArgs>
  headerProps?: Partial<DetailPageHeaderProps>
  hidden?: boolean | HiddenFunction
  children?: FormProps<any>['children']
  refetch?: UseCrudFormArgs['refetch']
  loading?: boolean
  disableReadOnlyButton?: boolean
  disableRedirectOnSuccess?: boolean
  disableMetaSection?: boolean
  defaultValues?: Record<string, unknown>
  disabledFields?: string[]
  formProps?: Partial<FormProps<any>>
  formTemplate?: React.JSXElementConstructor<any>
  formTemplateProps?: Record<string, unknown>
}

export interface CrudFormJsxProps extends FormSectionsProps {
  item?: CrudItem
  isNew: boolean
  isPreview: boolean
  isReadOnly: boolean
  setIsReadOnly: React.Dispatch<React.SetStateAction<boolean>>
  sections: FormSectionsProps['sections']
  module: CrudModule
  disabledFields: CrudFormProps['disabledFields']
  formContext: UseCrudFormReturn['formContext']
  onSubmit: UseCrudFormReturn['onSubmit']
  onDelete: UseCrudFormReturn['onDelete']
  userContext: UserContextInterface
  crudContext: CrudContextInterface
}

const CrudForm: React.FC<CrudFormProps> = (props) => {
  const {
    headerProps,
    defaultValues,
    disabledFields,
    disableReadOnlyButton,
    disableRedirectOnSuccess,
    disableMetaSection,
    disableHeader,
    useCrudFormProps,
    sections,
    formProps,
    item,
    refetch,
    module,
    children,
    loading,

    // Form Jsx is the template/ui/layout of the form
    formTemplate: FormTemplate = FormSections,
    formTemplateProps,
  } = props
  const { route } = module

  // Lifecycle
  const router = useRouter()
  const afterSubmit = () => {
    return !disableRedirectOnSuccess && router.push(`/${route.plural}`)
  }

  // useCrudForm
  const crudForm = useCrudForm({
    afterSubmit,
    item,
    refetch,
    module,
    defaultValues,
    sections,
    ...useCrudFormProps,
  })
  const { formContext, isNew, onSubmit, onDelete } = crudForm

  // Form states
  const { reset, formState } = formContext
  const { isSubmitting, isDirty } = formState
  const [isReadOnly, setIsReadOnly] = useState(!isNew)

  // Duck type to test if form is loaded in preview drawer
  const isPreview = Boolean(headerProps)

  // Other contexts
  const onUseCrud = useCrud()
  const onUseUser = useUser()

  // Form JSX Props
  const formJsxProps: CrudFormJsxProps = {
    item,
    isNew,
    isPreview,
    isReadOnly,
    setIsReadOnly,
    sections: [
      ...sections,
      // Hide meta section on new forms
      !isNew && !disableMetaSection && metaFormSection,
    ].filter(Boolean) as FormSectionsProps['sections'],
    module,
    disabledFields,
    formContext,
    onSubmit, // For remote submits be sure to wrap in RHF.handleSubmit e.g. formContext.handleSubmit(onSubmit)()
    onDelete,
    ...formTemplateProps,
    userContext: onUseUser,
    crudContext: onUseCrud,
  }

  const formRenderProps = { sections }

  // Loading state
  if (loading) return <CircularProgress fullScreen />

  return (
    <CrudFormProvider {...crudForm}>
      <Form
        formContext={formContext}
        isReadOnly={isReadOnly}
        setIsReadOnly={setIsReadOnly}
        onSubmit={onSubmit}
        formJsx={<FormTemplate {...formJsxProps} />}
        formRenderProps={formRenderProps}
        {...formProps}
      >
        {(renderProps: FormRenderPropsInterface) => (
          <>
            {!disableHeader && (
              <DetailPageHeader
                loading={loading}
                item={item}
                isPreview={isPreview}
                isReadOnly={isReadOnly}
                module={module}
                {...headerProps}
                actionButtons={[
                  ...(headerProps?.actionButtons || []),
                  ...(!disableReadOnlyButton &&
                    !isNew && [
                      {
                        key: 'edit',
                        type: 'button' as ButtonProps['type'],
                        title: isReadOnly ? 'Edit' : 'Cancel',
                        disabled: isSubmitting,
                        onClick: () => {
                          reset()
                          setIsReadOnly(!isReadOnly)
                        },
                      },
                    ]),
                ]}
                buttonProps={{
                  key: 'save',
                  type: 'submit' as ButtonProps['type'],
                  title: 'Save',
                  disabled: isSubmitting || !isDirty,
                  ...headerProps?.buttonProps,
                }}
              />
            )}

            {typeof children === 'function'
              ? children(renderProps)
              : renderProps.formJsx}
          </>
        )}
      </Form>
    </CrudFormProvider>
  )
}

export default CrudForm
