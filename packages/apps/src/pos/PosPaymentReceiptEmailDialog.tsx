import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { TextField } from '@gravis-os/fields'
import { ModelField } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@gravis-os/ui'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { DialogActions, DialogContent, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import noop from 'lodash/noop'
import toString from 'lodash/toString'

import getReceiptFileName from '../utils/getReceiptFileName'
import posConfig from './posConfig'
import { GetPdfMakeGeneratorResult } from './PosPaymentSuccess'
import { usePos } from './PosProvider'
import { Receipt } from './types'

interface PosPaymentReceiptEmailDialogProps {
  contactModule?: CrudModule
  getPdfMakeGenerator?: (reportType: string, item) => GetPdfMakeGeneratorResult // pdfDocGenerator from pdfMake
  onClose: VoidFunction
  open: boolean
  receipt?: Receipt
}

const PosPaymentReceiptEmailDialog: React.FC<
  PosPaymentReceiptEmailDialogProps
> = (props) => {
  const { contactModule, getPdfMakeGenerator, onClose, open, receipt } = props
  const { cart } = usePos()
  const [contact, setContact] = useState(cart?.customer)
  const [contactEmail, setContactEmail] = useState<string>(
    cart?.customer?.email ?? ''
  )
  const receiptFileName = getReceiptFileName(toString(cart?.receipt_id))

  const handleOnChangeContact = (selectedContact) => {
    setContact(selectedContact)
    if (selectedContact?.email) setContactEmail(selectedContact.email)
  }

  const getNewPdfUrl = async (blob) => {
    // generate new pdf
    const filepath = `${posConfig.receipt_bucket}/${receiptFileName}`

    const { data, error: uploadError } = await supabaseClient.storage
      .from('public')
      .upload(filepath, blob)
    if (uploadError) throw uploadError

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data?.Key}`
  }

  const sendEmail = async (pdfUrl: string) => {
    const res = await fetch(posConfig.routes.SEND_PAYMENT_RECEIPT, {
      body: JSON.stringify({
        email: contactEmail,
        link: pdfUrl,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
    if (!res.ok) throw new Error('Something went wrong')
    await toast.success('Your payment receipt email has been sent!')
  }

  const handleSendEmailReceipt = async () => {
    try {
      getPdfMakeGenerator('Receipt', receipt).getBlob(async (blob) => {
        const { data: paymentReceiptPdf, error } = await supabaseClient.storage
          .from('public')
          .list(posConfig.receipt_bucket, {
            search: receiptFileName,
          })
        if (error) {
          throw error
        }
        if (paymentReceiptPdf?.length && cart?.receipt_id) {
          const pdfUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/public/${posConfig.receipt_bucket}/${paymentReceiptPdf[0].name}`
          sendEmail(pdfUrl)
        } else {
          getNewPdfUrl(blob)
            .then(async (pdfUrl) => {
              return sendEmail(pdfUrl)
            })
            .catch((error_) =>
              console.error('Error cuaght at getNewPdfUrl blob', error_)
            )
        }
      })
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    }
  }

  return (
    <Dialog
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' } as TransitionProps}
      disableTitle
      fullScreen
      open={open}
    >
      <DialogTitle>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h6">Send Payment Receipt Email</Typography>
          <IconButton onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2}>
          <ModelField
            label="Contact"
            module={contactModule}
            name="contact_id"
            onChange={handleOnChangeContact}
            optionLabelKey="title"
            renderOption={({ option }) => (
              <>{option.full_name || option.title || option.email}</>
            )}
            select="id, full_name, title, email"
            setValue={noop}
            value={contact}
          />
          <TextField
            defaultValue={contact?.email || ''}
            name="email"
            onBlur={(e) => {
              if (!e.target.value) setContactEmail(contact?.email || '')
            }}
            onChange={(e) => setContactEmail(e.target.value)}
            value={contactEmail}
          />
        </Stack>
      </DialogContent>

      <Divider />
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Back
        </Button>
        <Button onClick={handleSendEmailReceipt} variant="contained">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PosPaymentReceiptEmailDialog
