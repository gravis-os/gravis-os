import { useEffect } from 'react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import toast from 'react-hot-toast'
import { DropzoneOptions, DropzoneState, useDropzone } from 'react-dropzone'
import { CrudItem } from '@gravis-os/types'
import isEmpty from 'lodash/isEmpty'
import getFileMetaFromFile from './getFileMetaFromFile'
import useFiles from './useFiles'
import { File } from './types'

export interface UseMultiStorageDropzoneProps {
  name?: string
  bucketName?: string
  item?: CrudItem // The primary module instance (e.g. Product) instance, possibly undefined for a new product
  storageRecords?: Record<string, unknown>[]
  module: { table: { name } } // Product module
  storageModule: { table: { name } } // ProductImage module
  setFormValue?: (value: any) => void
  setUpsertRowsValue?: (
    rows: Record<string, unknown>[]
  ) => Record<string, unknown>[]
  dropzoneProps?: DropzoneOptions
  attachToNewRecord?: boolean
}

export type UseMultiStorageDropzone = (props: UseMultiStorageDropzoneProps) => {
  files: File[]
  onRemove: (file: File) => void
  dropzone: DropzoneState
  dropzoneOptions: DropzoneOptions
}

const useMultiStorageDropzone: UseMultiStorageDropzone = (props) => {
  const {
    name = '',
    bucketName = 'public',
    item,
    storageRecords,
    module,
    storageModule,
    setFormValue,
    setUpsertRowsValue,
    dropzoneProps,
    attachToNewRecord = false,
  } = props

  // Vars
  const primaryTableName = module.table.name // Base model e.g. `product`
  const foreignTableName = storageModule.table.name // Has Many e.g. `product_image`
  const primaryRecord = item // `product` instance
  const foreignRecords =
    storageRecords ??
    item?.[foreignTableName] ?? // `product_image` instances
    item?.[name] ?? // `attachment_files` instance instead of `quotation_attachment_file` foreignTableName
    []
  // State
  const { files, setFiles } = useFiles({ items: foreignRecords, bucketName })

  // Effects
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.url))
  }, [])

  // Methods
  const handleUpload = async (files: File[]) => {
    try {
      const fileUploadPromises = files.map(async (file) => {
        const fileMeta = getFileMetaFromFile(file, storageModule.table.name)
        const { filePath } = fileMeta
        return supabaseClient.storage.from(bucketName).upload(filePath, file)
      })

      const uploadedFileMetas = await Promise.all(fileUploadPromises)

      if (!uploadedFileMetas.length) return

      // If uploaded successfully, prepare to save the S3 keys to db
      const defaultForeignTableRows = uploadedFileMetas.map(
        (uploadedFileMeta, i) => {
          const savedFileKey = uploadedFileMeta.data.Key
          const file = files[i]
          return {
            src: savedFileKey,
            alt: file.name,
            name: file.name,
            size: file.size,
            type: file.type,
            position: file.position || 0,
          }
        }
      )

      // Allow modify foreignTableRows
      const foreignTableRows =
        !isEmpty(primaryRecord) && setUpsertRowsValue
          ? setUpsertRowsValue(defaultForeignTableRows)
          : defaultForeignTableRows
      // This is a new item, defer db saving action instead by storing in the form value
      // for Quotation and SO, always defer
      if ((attachToNewRecord || isEmpty(primaryRecord)) && setFormValue) {
        setFormValue([...foreignTableRows, ...foreignRecords])
        return foreignTableRows
      }

      // Save to DB
      const savedRows = await supabaseClient.from(foreignTableName).upsert(
        foreignTableRows.map((row) => ({
          ...row,
          // The relation_id e.g. product_id
          [`${primaryTableName}_id`]: primaryRecord.id,
          ...(primaryRecord.workspace_id && {
            workspace_id: primaryRecord.workspace_id,
          }),
        }))
      )

      return savedRows
    } catch (err) {
      toast.error('Error')
      console.error('Error caught:', err)
    }
  }
  const handleDrop = async (newFiles: File[]): Promise<any> => {
    try {
      // Upload files on drop (@returns PostgrestResponse)
      const uploaded: any = await handleUpload(newFiles)

      // Handle degenerate case
      if (!uploaded) return

      // Handle upload error
      if (uploaded?.error) {
        toast.error('Error')
        console.error('Error caught:', uploaded?.error)
        return
      }

      // Set UI after upload success
      setFiles((prevFiles) => {
        // We need to assign instead of spread because we need to mount on the File class
        const newFilesWithId = newFiles.map((newFile, i) => {
          if ((attachToNewRecord || isEmpty(primaryRecord)) && setFormValue) {
            return Object.assign(newFile, { id: i })
          }
          return Object.assign(newFile, { id: uploaded.data[i].id })
        })
        return [...prevFiles, ...newFilesWithId].map((file) => {
          // Already existing file (this wasn't just uploaded)
          if (file.url) return file

          // If the file is new, return the new file
          return Object.assign(file, { url: URL.createObjectURL(file) })
        })
      })

      toast.success('Success')
    } catch (err) {
      console.error('Error caught:', err)
    }
  }
  const handleRemove = async (file): Promise<void> => {
    try {
      // Remove from storage
      const { data, error } = await supabaseClient.storage
        .from(bucketName)
        .remove([file.src])

      if (error) throw new Error('Error removing image')

      // Remove from database
      await supabaseClient
        .from(foreignTableName)
        .delete()
        .match({ id: file.id })

      // Remove from UI
      setFiles((prevFiles) =>
        prevFiles.filter((prevFile) => prevFile.url !== file.url)
      )

      // Update form values
      setFormValue(files)

      // Don't toast here because we let confirmation dialog handle toast for us
    } catch (err) {
      toast.error('Error')
      console.error('Error caught:', err)
    }
  }

  // Init Dropzone
  const dropzoneOptions = {
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/svg+xml': ['.svg'],
      'image/avif': ['.avif'],
      'image/webp': ['.webp'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'text/csv': ['.csv'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        ['.pptx'],
      'application/vnd.oasis.opendocument.text': ['.odt'],
      'application/rtf': ['.rtf'],
    } as DropzoneOptions['accept'],
    onDrop: handleDrop,
    ...dropzoneProps,
  }
  const dropzone = useDropzone(dropzoneOptions)

  return {
    files,
    setFiles,
    onUpload: handleUpload,
    onRemove: handleRemove,
    dropzone,
    dropzoneOptions,
  }
}

export default useMultiStorageDropzone
