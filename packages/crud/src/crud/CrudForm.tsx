import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { CircularProgress, ButtonProps } from '@gravis-os/ui'
import {
  FormSections,
  Form,
  FormProps,
  FormSectionsProps,
} from '@gravis-os/form'
import { CrudItem, CrudModule } from './typings'
import useCrudForm, { UseCrudFormArgs, UseCrudFormReturn } from './useCrudForm'
import DetailPageHeader, { DetailPageHeaderProps } from './DetailPageHeader'
import metaFormSection from './metaFormSection'

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
  formSectionsProps?: Omit<FormSectionsProps, 'sections'>
  sections: FormSectionsProps['sections']
  module: CrudModule
  useCrudFormProps?: Partial<UseCrudFormArgs>
  headerProps?: Partial<DetailPageHeaderProps>
  hidden?: boolean | HiddenFunction
  children?: FormProps<any>['children']
  refetch?: () => Promise<CrudItem>
  loading?: boolean
  disableReadOnlyButton?: boolean
  disableRedirectOnSuccess?: boolean
  defaultValues?: Record<string, unknown>
  disabledFields?: string[]
  formProps?: Partial<FormProps<any>>
  formJsxComponent?: React.JSXElementConstructor<any>
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
}

const CrudForm: React.FC<CrudFormProps> = (props) => {
  const {
    headerProps,
    disableHeader,
    useCrudFormProps,
    sections,
    formSectionsProps,
    formProps,
    item,
    refetch,
    module,
    children,
    loading,
    defaultValues,
    disabledFields,
    disableReadOnlyButton,
    disableRedirectOnSuccess,
    formJsxComponent: FormJsxComponent = FormSections,
  } = props
  const { route } = module

  // Lifecycle
  const router = useRouter()
  const afterSubmit = ({ isNew }) => {
    return !disableRedirectOnSuccess && router.push(`/${route.plural}`)
  }

  // useCrudForm
  const { formContext, isNew, onSubmit, onDelete } = useCrudForm({
    afterSubmit,
    item,
    refetch,
    module,
    defaultValues,
    ...useCrudFormProps,
  })

  // Form states
  const { isSubmitting, isDirty } = formContext.formState

  const [isReadOnly, setIsReadOnly] = useState(!isNew)

  // Duck type to test if form is loaded in preview drawer
  const isPreview = Boolean(headerProps)

  // Form JSX Props
  const formJsxProps: CrudFormJsxProps = {
    item,
    isNew,
    isPreview,
    isReadOnly,
    setIsReadOnly,
    sections: [...sections, metaFormSection] as FormSectionsProps['sections'],
    module,
    disabledFields,
    formContext,
    onSubmit, // For remote submits be sure to wrap in RHF.handleSubmit e.g. formContext.handleSubmit(onSubmit)
    onDelete,
    ...formSectionsProps,
  }

  // Loading state
  if (loading) return <CircularProgress fullScreen />

  return (
    <Form
      form={formContext}
      onSubmit={onSubmit}
      formJsx={<FormJsxComponent {...formJsxProps} />}
      {...formProps}
    >
      {(renderProps) => (
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
                      disabled: isSubmitting || (isDirty && !isReadOnly),
                      onClick: () => setIsReadOnly(!isReadOnly),
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
  )
}

export default CrudForm
