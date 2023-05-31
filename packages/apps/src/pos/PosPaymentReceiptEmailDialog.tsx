import React, { useState } from 'react'
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
import noop from 'lodash/noop'
import toString from 'lodash/toString'
import toast from 'react-hot-toast'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import getReceiptFileName from '../utils/getReceiptFileName'
import { usePos } from './PosProvider'
import posConfig from './posConfig'
import { Receipt } from './types'
import { pdfMakeGeneratorResult } from './PosPaymentSuccess'

interface PosPaymentReceiptEmailDialogProps {
  open: boolean
  onClose: VoidFunction
  pdfMakeGenerator?: (reportType: string, item) => pdfMakeGeneratorResult // pdfDocGenerator from pdfMake
  contactModule?: CrudModule
  receipt?: Receipt
}

const PosPaymentReceiptEmailDialog: React.FC<
  PosPaymentReceiptEmailDialogProps
> = (props) => {
  const { open, onClose, contactModule, pdfMakeGenerator, receipt } = props
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

    return process.env.NEXT_PUBLIC_SUPABASE_URL.concat(
      `/storage/v1/object/public/${data?.Key}`
    )
  }

  const sendEmail = async (pdfUrl: string) => {
    const res = await fetch(posConfig.routes.SEND_PAYMENT_RECEIPT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: contactEmail,
        link: pdfUrl,
      }),
    })
    if (!res.ok) throw new Error('Something went wrong')
    await toast.success('Your payment receipt email has been sent!')
  }

  const handleSendEmailReceipt = async () => {
    try {
      pdfMakeGenerator('Receipt', receipt).getBlob(async (blob) => {
        const { data: paymentReceiptPdf, error } = await supabaseClient.storage
          .from('public')
          .list(posConfig.receipt_bucket, {
            search: receiptFileName,
          })
        if (error) {
          throw error
        }
        if (paymentReceiptPdf?.length && cart?.receipt_id) {
          const pdfUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.concat(
            `/storage/v1/object/public/public/${posConfig.receipt_bucket}/${paymentReceiptPdf[0].name}`
          )
          sendEmail(pdfUrl)
        } else {
          getNewPdfUrl(blob).then(async (pdfUrl) => {
            sendEmail(pdfUrl)
          })
        }
      })
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    }
  }

  return (
    <Dialog
      open={open}
      fullScreen
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' } as TransitionProps}
      disableTitle
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
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
            module={contactModule}
            name="contact_id"
            setValue={noop}
            onChange={handleOnChangeContact}
            value={contact}
            label="Contact"
            optionLabelKey="title"
            select="id, full_name, title, email"
            renderOption={({ option }) => (
              <>{option.full_name || option.title || option.email}</>
            )}
          />
          <TextField
            name="email"
            defaultValue={contact?.email || ''}
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            onBlur={(e) => {
              if (!e.target.value) setContactEmail(contact?.email || '')
            }}
          />
        </Stack>
      </DialogContent>

      <Divider />
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Back
        </Button>
        <Button variant="contained" onClick={handleSendEmailReceipt}>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PosPaymentReceiptEmailDialog
