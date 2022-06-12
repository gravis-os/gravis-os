import React from 'react'
import { Button } from '@gravis-os/ui'
import { DetailPage, DetailPageProps } from '@gravis-os/crud'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import omit from 'lodash/omit'
import getQuotationTitle from './getQuotationTitle'
import DocumentFormSections from './DocumentFormSections'

export interface DocumentDetailPageProps extends DetailPageProps {}

const DocumentDetailPage: React.FC<DocumentDetailPageProps> = (props) => {
  const { module, formSections, headerProps, crudFormProps, ...rest } = props

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
        formJsxComponent: DocumentFormSections,
        useCrudFormProps: {
          setFormValues: ({ values, isNew }) => omit(values, ['lines']),
          defaultValues: { title: getQuotationTitle() },
        },
        ...crudFormProps,
      }}
      {...rest}
    />
  )
}

export default DocumentDetailPage
