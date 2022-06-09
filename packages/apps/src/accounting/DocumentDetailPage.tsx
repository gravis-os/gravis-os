import React, { useState } from 'react'
import { Button } from '@gravis-os/ui'
import { DetailPageProps, DetailPage } from '@gravis-os/crud'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import omit from 'lodash/omit'
import DocumentFormSections from './DocumentFormSections'
import getQuotationTitle from './getQuotationTitle'

export interface DocumentDetailPageProps extends DetailPageProps {}

const DocumentDetailPage: React.FC<DocumentDetailPageProps> = (props) => {
  const { module, formSections, headerProps, crudFormProps, ...rest } = props

  const [isReadOnly, setIsReadOnly] = useState(true)

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
        headerProps: { buttonProps: { disabled: true } },
        formJsxComponent: DocumentFormSections,
        formSectionsProps: { isReadOnly },
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
