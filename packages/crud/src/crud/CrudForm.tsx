import React, { useMemo } from 'react'
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

const getFormComponentByCrudFormType = type => {
  switch (type) {
    case 'form':
    default:
      return FormSections
  }
}

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
  formSectionsProps?: FormSectionsProps
  sections: FormSectionsProps['sections']
  module: CrudModule
  useCrudFormProps?: Partial<UseCrudFormArgs>
  headerProps?: Partial<DetailPageHeaderProps>
  hidden?: boolean | HiddenFunction
  children?: FormProps<any>['children']
  refetch?: () => Promise<CrudItem>
  loading?: boolean
  defaultValues?: Record<string, unknown>
  disabledFields?: string[]
  formProps?: Partial<FormProps<any>>
  type?: 'quotation' | 'wizard' | 'form'
}

const CrudForm: React.FC<CrudFormProps> = props => {
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
    type = 'form',
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

  // Duck type to test if form is loaded in preview drawer
  const isPreview = Boolean(headerProps)

  // Form JSX Props
  const formJsxProps = {
    item,
    isNew,
    isPreview,
    sections: [...sections, metaFormSection],
    module,
    disabledFields,
  }

  // Form Component
  const FormJsxComponent = useMemo(
    () => getFormComponentByCrudFormType(type),
    [type]
  )

  // Loading state
  if (loading) return <CircularProgress fullScreen />

  return (
    <Form
      form={form}
      onSubmit={handleSubmit}
      formJsx={<FormJsxComponent {...formJsxProps} {...formSectionsProps} />}
      {...formProps}
    >
      {renderProps => (
        <>
          {!disableHeader && (
            <DetailPageHeader
              loading={loading}
              item={item}
              module={module}
              buttonProps={{
                key: 'save',
                type: 'submit' as ButtonProps['type'],
                title: 'Save',
                disabled: isSubmitting || !isDirty,
              }}
              {...headerProps}
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
