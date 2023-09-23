import React from 'react'
import CSVReader from 'react-csv-reader'
import toast from 'react-hot-toast'

import { Typeform, TypeformState } from '@gravis-os/fields'
import { CrudModule } from '@gravis-os/types'
import {
  Box,
  Button,
  DialogButton,
  DialogButtonProps,
  Stack,
  Typography,
  useOpen,
} from '@gravis-os/ui'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import omit from 'lodash/omit'

import useCreateMutation from '../../hooks/useCreateMutation'
import DataTable, { DataTableProps } from '../DataTable'
import getManyToManyUploadedRows from './getManyToManyUploadedRows'
import { getUploadedRows } from './getUploadedRows'
import useDownloadTableDefinitionCsvFile from './useDownloadTableDefinitionCsvFile'

export interface CrudUploadDialogProps extends DialogButtonProps {
  dataTableProps?: Partial<DataTableProps>
  getUploadValues?: (rows: unknown) => unknown
  hasUploadTemplate?: boolean
  manyToManyKeys?: string[]
  module: CrudModule
  onUpload?: (store: TypeformState, fileData: any) => Promise<void>
  requireDownload?: boolean
  submitData?: (data) => Promise<{ error: { message: string } | null }>
  uploadFields?: string[]
}

// TODO: Clean data + handle relations + handle error + allow edits
const CrudUploadDialog: React.FC<CrudUploadDialogProps> = (props) => {
  const {
    dataTableProps = {},
    getUploadValues: injectedGetUploadedValues,
    hasUploadTemplate,
    manyToManyKeys,
    module,
    onUpload,
    requireDownload = true,
    submitData,
    uploadFields,
    ...rest
  } = props
  const { tableHeaderRenameMapping } = module ?? {}

  const [open, { close, setIsOpen }] = useOpen(false)

  const { handleDownload, isDownloaded, resetIsDownloaded, tableColumnNames } =
    useDownloadTableDefinitionCsvFile({
      hasUploadTemplate,
      manyToManyKeys,
      module,
      uploadFields,
    })

  const { createMutation } = useCreateMutation({
    module,
  })

  const ModuleIcon = module.Icon

  return (
    <DialogButton
      dialogProps={{ maxWidth: 'md' }}
      onClose={resetIsDownloaded}
      open={open}
      setOpen={setIsOpen}
      startIcon={<FileUploadOutlinedIcon />}
      title={`Upload ${module.name.plural}`}
      variant="callout"
      {...rest}
    >
      <Typeform
        center
        items={[
          {
            title: `Welcome to the ${module.name.singular} Upload Wizard`,
            icon: <ModuleIcon sx={{ fontSize: 'h1.fontSize' }} />,
            key: 'welcome',
            render: (props) => {
              const { slider } = props
              const { next } = slider
              return (
                <>
                  <Button onClick={next} size="large" variant="contained">
                    Start
                  </Button>
                </>
              )
            },
            subtitle: 'Get started with bulk uploading your data.',
          },
          ...(hasUploadTemplate
            ? []
            : [
                {
                  title: `Download ${module.name.singular} Template`,
                  key: 'download-template',
                  render: (props) => {
                    const {
                      slider: { next, prev },
                    } = props

                    return (
                      <>
                        <Button
                          disabled={isDownloaded}
                          fullWidth
                          onClick={() => handleDownload()}
                          size="large"
                          startIcon={<FileDownloadOutlinedIcon />}
                          variant="contained"
                        >
                          {isDownloaded ? 'Downloaded' : 'Download'}
                        </Button>

                        <Stack
                          alignItems="center"
                          direction="row"
                          justifyContent="space-between"
                          spacing={1}
                          sx={{ mt: 2, width: '100%' }}
                        >
                          <Button onClick={prev} size="large">
                            Previous
                          </Button>

                          <Button
                            disabled={requireDownload && !isDownloaded}
                            onClick={next}
                            size="large"
                            variant="contained"
                          >
                            Next
                          </Button>
                        </Stack>
                      </>
                    )
                  },
                  subtitle:
                    'Fill in your data into this excel template before continuing.',
                },
              ]),
          {
            title: `Upload ${module.name.singular} Data`,
            key: 'upload-file',
            render: (props) => {
              const {
                slider: { next, prev },
                store,
              } = props
              const { values } = store

              const isUploaded = Boolean(
                (values?.uploadedRows as unknown[])?.length
              )

              const handleCsvFileUpload = (fileData) => {
                if (!fileData) return
                store.add({ uploadedRows: fileData })
              }

              return (
                <>
                  {hasUploadTemplate ? (
                    <>
                      <Typography mb={1} variant="body2">
                        XLSX files only
                      </Typography>
                      <input
                        id="xlsx-upload"
                        onChange={(e) => {
                          const { files } = e.target
                          if (files && files[0]) {
                            const reader = new FileReader()

                            reader.addEventListener('load', async () => {
                              const buffer = reader.result as ArrayBuffer
                              await onUpload(store, buffer)
                            })

                            // eslint-disable-next-line unicorn/prefer-blob-reading-methods
                            reader.readAsArrayBuffer(files[0])
                          }
                        }}
                        type="file"
                      />
                    </>
                  ) : (
                    <CSVReader
                      onFileLoaded={handleCsvFileUpload}
                      parserOptions={{
                        dynamicTyping: true,
                        header: true,
                        skipEmptyLines: true,
                      }}
                    />
                  )}

                  <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={1}
                    sx={{ mt: 2, width: '100%' }}
                  >
                    <Button onClick={prev} size="large">
                      Previous
                    </Button>

                    <Button
                      disabled={!isUploaded}
                      onClick={next}
                      size="large"
                      variant="contained"
                    >
                      Next
                    </Button>
                  </Stack>
                </>
              )
            },
            subtitle: `Select the file ${
              hasUploadTemplate
                ? ''
                : "that you've downloaded in the previous step "
            }with your data populated to continue.`,
          },
          {
            title: `Review ${module.name.singular} Data`,
            key: 'review-data',
            render: (props) => {
              const {
                // prev and next return void
                slider: { next, prev },
                store,
              } = props

              const { uploadedRows } = store.values
              const items = uploadedRows as any

              const columnDefs = tableColumnNames.map((tableColumnName) => ({
                cellRenderer: 'agGroupCellRenderer',
                field: tableColumnName,
              }))

              const uploadDataWithDefaultTemplate = async () => {
                /**
                 * Used if tableHeaderRenameMapping is provided to change the renamed headers back when uploading the csv file.
                 * This ensures that the values provided are consistent with the header names in the database.
                 */
                const rowsAfterReverseTableHeaderRenameMapping =
                  getUploadedRows(uploadedRows, tableHeaderRenameMapping)

                const mainTableRows = (
                  rowsAfterReverseTableHeaderRenameMapping as Record<
                    string,
                    unknown
                  >[]
                )?.map((row) => omit(row, manyToManyKeys))

                const updatedUploadedRows =
                  injectedGetUploadedValues(mainTableRows)

                const { data, error } = await createMutation.mutateAsync(
                  updatedUploadedRows
                )

                if (error) {
                  toast.error(
                    `Some fields are wrong in your csv file: \n${error.message}`
                  )
                  return
                }

                if (data) {
                  if (manyToManyKeys?.length) {
                    const manyToManyTables = getManyToManyUploadedRows(
                      module.table.name,
                      manyToManyKeys,
                      rowsAfterReverseTableHeaderRenameMapping as Record<
                        string,
                        unknown
                      >[],
                      data as Record<string, unknown>[]
                    )

                    const manyToManyTablesResponse = await Promise.allSettled(
                      manyToManyTables.map(async ({ rows, tableName }) =>
                        supabaseClient.from(tableName).insert(rows)
                      )
                    )

                    const rejectedManyToManyTablesResponse =
                      manyToManyTablesResponse.filter(
                        ({ status }) => status === 'rejected'
                      )

                    if (rejectedManyToManyTablesResponse.length > 0) {
                      toast.error(
                        `Some relations fail to upload: \n${rejectedManyToManyTablesResponse
                          .map(
                            (response) =>
                              (response as PromiseRejectedResult).reason.message
                          )
                          .filter(Boolean)
                          .join('\n')}`
                      )
                    }
                  }

                  next()
                }
              }

              const handleUploadClick = async () => {
                switch (true) {
                  case !!submitData: {
                    const { error } = await submitData(uploadedRows)
                    if (error) {
                      toast.error(
                        `Some fields are wrong in your file: \n${error.message}`
                      )
                      return
                    }

                    next()
                    return
                  }
                  default: {
                    await uploadDataWithDefaultTemplate()
                    return
                  }
                }
              }

              return (
                <>
                  <Box sx={{ textAlign: 'left' }}>
                    <DataTable
                      columnDefs={columnDefs}
                      defaultColDef={{ autoHeight: false }}
                      disableResizeGrid={false}
                      disableSizeColumnsToFit
                      height={400}
                      module={module}
                      rowData={items}
                      {...dataTableProps}
                    />
                  </Box>

                  <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={1}
                    sx={{ mt: 2, width: '100%' }}
                  >
                    <Button onClick={prev} size="large">
                      Previous
                    </Button>

                    <Button
                      onClick={handleUploadClick}
                      size="large"
                      variant="contained"
                    >
                      Upload
                    </Button>
                  </Stack>
                </>
              )
            },
            subtitle: 'The following items will be created in the next step.',
          },
          {
            title: `Your ${module.name.singular} Data has been Uploaded`,
            icon: (
              <CheckCircleOutlinedIcon
                color="success"
                sx={{ fontSize: 'h1.fontSize' }}
              />
            ),
            key: 'success',
            render: (props) => {
              const { store } = props
              const { reset } = store
              return (
                <>
                  <Button
                    onClick={() => {
                      reset()
                      close()
                    }}
                    size="large"
                    variant="contained"
                  >
                    Close
                  </Button>
                </>
              )
            },
            subtitle:
              'Your bulk upload has been submitted. Kindly close this dialog and refresh the browser to confirm.',
          },
        ]}
        minHeight={400}
        sliderProps={{ lazy: true }}
        sx={{ p: 4 }}
      />
    </DialogButton>
  )
}

export default CrudUploadDialog
