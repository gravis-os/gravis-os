import React, { ReactNode, useEffect, useState } from 'react'

import { UserContextInterface, useUser } from '@gravis-os/auth'
import {
  Form,
  FormProps,
  FormRenderPropsInterface,
  FormSections,
  FormSectionsProps,
} from '@gravis-os/form'
import { CrudItem, CrudModule } from '@gravis-os/types'
import { ButtonProps, CircularProgress } from '@gravis-os/ui'
import { useRouter } from 'next/router'

import CrudFormProvider from '../providers/CrudFormProvider'
import { CrudContextInterface } from './CrudContext'
import DetailPageHeader, { DetailPageHeaderProps } from './DetailPageHeader'
import metaFormSection from './metaFormSection'
import renderMetaReadOnlySection from './renderMetaReadOnlySection'
import useCrud from './useCrud'
import useCrudForm, { UseCrudFormArgs, UseCrudFormReturn } from './useCrudForm'

type HiddenFunction = ({
  isNew,
  isPreview,
}: {
  isNew: boolean
  isPreview: boolean
}) => boolean

interface RenderHeaderProps
  extends Pick<
    CrudFormJsxProps,
    'isNew' | 'isReadOnly' | 'onDelete' | 'onSubmit' | 'setIsReadOnly'
  > {
  formContext: UseCrudFormReturn['formContext']
}

export interface CrudFormProps {
  children?: FormProps<any>['children']
  defaultIsReadOnly?: boolean
  defaultValues?: Record<string, unknown>
  disableHeader?: boolean
  disableMetaSection?: boolean
  disableReadOnlyButton?: boolean
  disableRedirectOnSuccess?: boolean
  disabledFields?: string[]
  formProps?: Partial<FormProps<any>>
  formTemplate?: React.JSXElementConstructor<any>
  formTemplateProps?: Record<string, unknown>
  headerProps?: Partial<DetailPageHeaderProps>
  hidden?: HiddenFunction | boolean
  item?: CrudItem & {
    created_by?: null | string
    updated_by?: null | string
  } // Typically gets injected via DetailPage cloneElement
  loading?: boolean
  module: CrudModule
  refetch?: UseCrudFormArgs['refetch']
  renderHeader?: (props: RenderHeaderProps) => ReactNode
  sections: FormSectionsProps['sections']
  setItem?: React.Dispatch<React.SetStateAction<CrudItem>> // Typically gets injected via DetailPage cloneElement
  shouldUseFullNameInMetaSection?: boolean
  useCrudFormProps?: Partial<UseCrudFormArgs>
  userModuleTableName?: string
}

export interface CrudFormJsxProps extends FormSectionsProps {
  crudContext: CrudContextInterface
  disabledFields: CrudFormProps['disabledFields']
  formContext: UseCrudFormReturn['formContext']
  isNew: boolean
  isPreview: boolean
  isReadOnly: boolean
  item?: CrudItem
  module: CrudModule
  onDelete: UseCrudFormReturn['onDelete']
  onSubmit: UseCrudFormReturn['onSubmit']
  sections: FormSectionsProps['sections']
  setIsReadOnly: React.Dispatch<React.SetStateAction<boolean>>
  userContext: UserContextInterface
}

const CrudForm: React.FC<CrudFormProps> = (props) => {
  const {
    children,
    defaultIsReadOnly: injectedDefaultIsReadOnly,
    defaultValues,
    disabledFields,
    disableHeader,
    disableMetaSection,
    disableReadOnlyButton,
    disableRedirectOnSuccess,
    formProps,
    // Form Jsx is the template/ui/layout of the form
    formTemplate: FormTemplate = FormSections,
    formTemplateProps,
    headerProps,
    item,
    loading,
    module,
    refetch,
    renderHeader,
    sections,

    shouldUseFullNameInMetaSection = false,

    useCrudFormProps,
    userModuleTableName = 'user',
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
    defaultValues,
    item,
    module,
    refetch,
    sections,
    ...useCrudFormProps,
  })
  const { formContext, isNew, onDelete, onSubmit } = crudForm
  const { shouldSkipOnSubmit } = useCrudFormProps ?? {}

  // Read Only State
  const defaultIsReadOnly =
    typeof injectedDefaultIsReadOnly === 'boolean'
      ? injectedDefaultIsReadOnly
      : !isNew
  const [isReadOnly, setIsReadOnly] = useState(defaultIsReadOnly)

  // Update isNew state after data is loaded
  useEffect(() => {
    setIsReadOnly(defaultIsReadOnly)
  }, [isNew])

  // Form states
  const { formState, reset } = formContext
  const { isDirty, isSubmitSuccessful, isSubmitting } = formState

  // Reset readOnly after every submission
  useEffect(() => {
    if (isSubmitSuccessful && !isReadOnly && !shouldSkipOnSubmit?.(formContext))
      setIsReadOnly(true)
  }, [isSubmitSuccessful])

  // Keep track whether to disable button while redirecting after submitting form
  const isLoadingRedirectOnSuccess =
    isSubmitSuccessful && !disableRedirectOnSuccess

  // Duck type to test if form is loaded in preview drawer
  const isPreview = Boolean(headerProps)

  // Other contexts
  const onUseCrud = useCrud()
  const onUseUser = useUser()

  const shouldShowMetaReadOnlySection =
    shouldUseFullNameInMetaSection && (item?.created_by || item?.updated_by)
  const metaSection = {
    ...metaFormSection,
    ...(shouldShowMetaReadOnlySection && {
      renderReadOnlySection: (props) =>
        renderMetaReadOnlySection(props, userModuleTableName),
    }),
  }

  // Form JSX Props
  const formJsxProps: CrudFormJsxProps = {
    disabledFields,
    formContext,
    isNew,
    isPreview,
    isReadOnly,
    item,
    module,
    onDelete,
    onSubmit, // For remote submits be sure to wrap in RHF.handleSubmit e.g. formContext.handleSubmit(onSubmit)()
    sections: [
      ...sections,
      // Hide meta section on new forms
      !isNew && !disableMetaSection && metaSection,
    ].filter(Boolean) as FormSectionsProps['sections'],
    setIsReadOnly,
    ...formTemplateProps,
    crudContext: onUseCrud,
    userContext: onUseUser,
  }

  const formRenderProps = { sections }

  // Loading state
  if (loading) return <CircularProgress fullScreen />

  return (
    <CrudFormProvider {...crudForm}>
      <Form
        formContext={formContext}
        formJsx={<FormTemplate {...formJsxProps} />}
        formRenderProps={formRenderProps}
        isReadOnly={isReadOnly}
        onSubmit={onSubmit}
        setIsReadOnly={setIsReadOnly}
        {...formProps}
      >
        {(renderProps: FormRenderPropsInterface) => (
          <>
            {renderHeader &&
              renderHeader({
                formContext,
                isNew,
                isReadOnly,
                onDelete,
                onSubmit,
                setIsReadOnly,
              })}
            {!disableHeader && (
              <DetailPageHeader
                isPreview={isPreview}
                isReadOnly={isReadOnly}
                item={item}
                loading={loading}
                module={module}
                {...headerProps}
                actionButtons={[
                  ...(headerProps?.actionButtons || []),
                  ...(!disableReadOnlyButton && !isNew
                    ? [
                        {
                          title: isReadOnly ? 'Edit' : 'Cancel',
                          disabled: isSubmitting,
                          key: 'edit',
                          onClick: () => {
                            reset()
                            setIsReadOnly(!isReadOnly)
                          },
                          type: 'button' as ButtonProps['type'],
                        },
                      ]
                    : []),
                ]}
                buttonProps={{
                  title: 'Save',
                  disabled:
                    isSubmitting || !isDirty || isLoadingRedirectOnSuccess,
                  key: 'save',
                  type: 'submit' as ButtonProps['type'],
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
