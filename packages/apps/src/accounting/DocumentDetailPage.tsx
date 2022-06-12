import React, { useState } from 'react'
import { Button } from '@gravis-os/ui'
import { DetailPageProps, DetailPage } from '@gravis-os/crud'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import omit from 'lodash/omit'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined'
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
