import { Typeform } from '@gravis-os/fields'
import { CrudModule } from '@gravis-os/types'
import {
  Box,
  Button,
  DialogButton,
  DialogButtonProps,
  Stack,
  useOpen,
} from '@gravis-os/ui'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import React from 'react'
import CSVReader from 'react-csv-reader'
import omit from 'lodash/omit'
import toast from 'react-hot-toast'
import useCreateMutation from '../../hooks/useCreateMutation'
import DataTable from '../DataTable'
import { getUploadedRows } from './getUploadedRows'
import useDownloadTableDefinitionCsvFile from './useDownloadTableDefinitionCsvFile'
import getManyToManyUploadedRows from './getManyToManyUploadedRows'

export interface CrudUploadDialogProps extends DialogButtonProps {
  module: CrudModule
  requireDownload?: boolean
  uploadFields?: string[]
  manyToManyKeys?: string[]
  getUploadValues?: (rows: unknown) => unknown
}

// TODO: Clean data + handle relations + handle error + allow edits
const CrudUploadDialog: React.FC<CrudUploadDialogProps> = (props) => {
  const {
    module,
    requireDownload = true,
    uploadFields,
    manyToManyKeys,
    getUploadValues: injectedGetUploadedValues,
    ...rest
  } = props
  const { tableHeaderRenameMapping } = module ?? {}

  const [open, { setIsOpen, close }] = useOpen(false)

  const { handleDownload, isDownloaded, resetIsDownloaded, tableColumnNames } =
    useDownloadTableDefinitionCsvFile({ module, uploadFields, manyToManyKeys })

  const { createMutation } = useCreateMutation({
    module,
  })

  const ModuleIcon = module.Icon

  return (
    <DialogButton
      open={open}
      setOpen={setIsOpen}
      onClose={resetIsDownloaded}
      title={`Upload ${module.name.plural}`}
      variant="callout"
      startIcon={<FileUploadOutlinedIcon />}
      dialogProps={{ maxWidth: 'md' }}
      {...rest}
    >
      <Typeform
        center
        minHeight={400}
        sx={{ p: 4 }}
        sliderProps={{ lazy: true }}
        items={[
          {
            key: 'welcome',
            icon: <ModuleIcon sx={{ fontSize: 'h1.fontSize' }} />,
            title: `Welcome to the ${module.name.singular} Upload Wizard`,
            subtitle: 'Get started with bulk uploading your data.',
            render: (props) => {
              const { slider } = props
              const { next } = slider
              return (
                <>
                  <Button size="large" variant="contained" onClick={next}>
                    Start
                  </Button>
                </>
              )
            },
          },
          {
            key: 'download-template',
            title: `Download ${module.name.singular} Template`,
            subtitle:
              'Fill in your data into this excel template before continuing.',
            render: (props) => {
              const {
                slider: { prev, next },
              } = props

              return (
                <>
                  <Button
                    size="large"
                    disabled={isDownloaded}
                    variant="contained"
                    fullWidth
                    startIcon={<FileDownloadOutlinedIcon />}
                    onClick={() => handleDownload()}
                  >
                    {isDownloaded ? 'Downloaded' : 'Download'}
                  </Button>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                    sx={{ width: '100%', mt: 2 }}
                  >
                    <Button size="large" onClick={prev}>
                      Previous
                    </Button>

                    <Button
                      variant="contained"
                      size="large"
                      onClick={next}
                      disabled={requireDownload && !isDownloaded}
                    >
                      Next
                    </Button>
                  </Stack>
                </>
              )
            },
          },
          {
            key: 'upload-file',
            title: `Upload ${module.name.singular} Data`,
            subtitle:
              "Select the file that you've downloaded in the previous step with your data populated to continue.",
            render: (props) => {
              const {
                slider: { prev, next },
                store,
              } = props
              const { values } = store

              const isUploaded = Boolean(
                (values?.uploadedRows as unknown[])?.length
              )

              const handleFileUpload = (fileData) => {
                if (!fileData) return
                store.add({ uploadedRows: fileData })
              }

              return (
                <>
                  <CSVReader
                    onFileLoaded={handleFileUpload}
                    parserOptions={{
                      header: true,
                      dynamicTyping: true,
                      skipEmptyLines: true,
                    }}
                  />

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                    sx={{ width: '100%', mt: 2 }}
                  >
                    <Button size="large" onClick={prev}>
                      Previous
                    </Button>

                    <Button
                      variant="contained"
                      size="large"
                      onClick={next}
                      disabled={!isUploaded}
                    >
                      Next
                    </Button>
                  </Stack>
                </>
              )
            },
          },
          {
            key: 'review-data',
            title: `Review ${module.name.singular} Data`,
            subtitle: 'The following items will be created in the next step.',
            render: (props) => {
              const {
                store,
                slider: { prev, next },
              } = props

              const { uploadedRows } = store.values
              const items = uploadedRows as any

              const columnDefs = tableColumnNames.map((tableColumnName) => ({
                field: tableColumnName,
              }))

              const handleUploadClick = async () => {
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
                      manyToManyTables.map(async ({ tableName, rows }) =>
                        supabaseClient.from(tableName).insert(rows)
                      )
                    )

                    const rejectedManyToManyTablesResponse =
                      manyToManyTablesResponse.filter(
                        ({ status }) => status === 'rejected'
                      )

                    if (rejectedManyToManyTablesResponse.length) {
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

              return (
                <>
                  <Box sx={{ textAlign: 'left' }}>
                    <DataTable
                      height={400}
                      disableSizeColumnsToFit
                      disableResizeGrid={false}
                      defaultColDef={{ autoHeight: false }}
                      module={module}
                      rowData={items}
                      columnDefs={columnDefs}
                    />
                  </Box>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                    sx={{ width: '100%', mt: 2 }}
                  >
                    <Button size="large" onClick={prev}>
                      Previous
                    </Button>

                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleUploadClick}
                    >
                      Upload
                    </Button>
                  </Stack>
                </>
              )
            },
          },
          {
            key: 'success',
            icon: (
              <CheckCircleOutlinedIcon
                color="success"
                sx={{ fontSize: 'h1.fontSize' }}
              />
            ),
            title: `Your ${module.name.singular} Data has been Uploaded`,
            subtitle:
              'Your bulk upload has been submitted. Kindly close this dialog and refresh the browser to confirm.',
            render: (props) => {
              const { store } = props
              const { reset } = store
              return (
                <>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={() => {
                      reset()
                      close()
                    }}
                  >
                    Close
                  </Button>
                </>
              )
            },
          },
        ]}
      />
    </DialogButton>
  )
}

export default CrudUploadDialog
