'use client'

import React from 'react'

import { DetailPage, DetailPageProps } from '@gravis-os/crud'
import { useRouter } from 'next/navigation'

import { DocumentTypeEnum } from './constants'
import DocumentFormSections from './DocumentFormSections'
import getDocumentPrefixByType from './getDocumentPrefixByType'
import getDocumentTitle from './getDocumentTitle'

export interface DocumentDetailPageProps extends DetailPageProps {
  type: DocumentTypeEnum
}

const DocumentDetailPage: React.FC<DocumentDetailPageProps> = (props) => {
  const { crudFormProps, formSections, module, type, ...rest } = props

  const router = useRouter()
  return (
    <DetailPage
      crudFormProps={{
        disableReadOnlyButton: true,
        disableRedirectOnSuccess: true,
        formTemplate: DocumentFormSections,
        ...crudFormProps,
        useCrudFormProps: {
          afterDelete: () => router.push(module.route.plural),
          defaultValues: {
            title: getDocumentTitle({ prefix: getDocumentPrefixByType(type) }),
          },
          setFormValues: (props) => {
            const { values } = props
            return values
          },
          ...crudFormProps?.useCrudFormProps,
        },
      }}
      formSections={formSections}
      module={module}
      {...rest}
    />
  )
}

export default DocumentDetailPage
