import React from 'react'
import { DetailPage, DetailPageProps } from '@gravis-os/crud'
import { useRouter } from 'next/router'
import DocumentFormSections from './DocumentFormSections'
import getDocumentTitle from './getDocumentTitle'
import getDocumentPrefixByType from './getDocumentPrefixByType'
import { DocumentTypeEnum } from './constants'

export interface DocumentDetailPageProps extends DetailPageProps {
  type: DocumentTypeEnum
}

const DocumentDetailPage: React.FC<DocumentDetailPageProps> = (props) => {
  const { type, module, formSections, crudFormProps, ...rest } = props

  const router = useRouter()

  return (
    <DetailPage
      module={module}
      formSections={formSections}
      crudFormProps={{
        disableReadOnlyButton: true,
        disableRedirectOnSuccess: true,
        formJsxComponent: DocumentFormSections,
        useCrudFormProps: {
          afterDelete: () => router.push(module.route.plural),
          setFormValues: (props) => {
            const { values, isNew } = props
            return values
          },
          defaultValues: {
            title: getDocumentTitle({ prefix: getDocumentPrefixByType(type) }),
          },
        },
        ...crudFormProps,
      }}
      {...rest}
    />
  )
}

export default DocumentDetailPage
