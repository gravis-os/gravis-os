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
import useCrudForm, { UseCrudFormArgs } from './useCrudForm'
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
  defaultValues?: Record<string, unknown>
  disabledFields?: string[]
  formProps?: Partial<FormProps<any>>
  formJsxComponent?: React.JSXElementConstructor<any>
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
    formJsxComponent: FormJsxComponent = FormSections,
  } = props
  const { route } = module

  // Lifecycle
  const router = useRouter()
  const afterSubmit = ({ isNew }) => router.push(`/${route.plural}`)

  // useCrudForm
  const { form, isNew, handleSubmit } = useCrudForm({
    afterSubmit,
    item,
    refetch,
    module,
    defaultValues,
    ...useCrudFormProps,
  })

  // Form states
  const { isSubmitting, isDirty } = form.formState

  const [isReadOnly, setIsReadOnly] = useState(!isNew)

  // Duck type to test if form is loaded in preview drawer
  const isPreview = Boolean(headerProps)

  // Form JSX Props
  const formJsxProps = {
    item,
    isNew,
    isPreview,
    isReadOnly,
    setIsReadOnly,
    sections: [...sections, metaFormSection] as FormSectionsProps['sections'],
    module,
    disabledFields,
    ...formSectionsProps,
  }

  // Loading state
  if (loading) return <CircularProgress fullScreen />

  return (
    <Form
      form={form}
      onSubmit={handleSubmit}
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
