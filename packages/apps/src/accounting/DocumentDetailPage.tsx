import React from 'react'
import { Button } from '@gravis-os/ui'
import { DetailPage, DetailPageProps } from '@gravis-os/crud'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import { useRouter } from 'next/router'
import getQuotationTitle from './getQuotationTitle'
import DocumentFormSections from './DocumentFormSections'

export interface DocumentDetailPageProps extends DetailPageProps {}

const DocumentDetailPage: React.FC<DocumentDetailPageProps> = (props) => {
  const { module, formSections, headerProps, crudFormProps, ...rest } = props

  const router = useRouter()

  return (
    <DetailPage
      module={module}
      formSections={formSections}
      headerProps={{
        button: (
          <Button
            variant="contained"
            endIcon={<ArrowRightAltOutlinedIcon />}
            fullWidthMobile
          >
            Move to Sales Order
          </Button>
        ),
        ...headerProps,
      }}
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
          defaultValues: { title: getQuotationTitle() },
        },
        ...crudFormProps,
      }}
      {...rest}
    />
  )
}

export default DocumentDetailPage
