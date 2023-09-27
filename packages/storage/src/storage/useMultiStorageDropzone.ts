/* eslint-disable fp/no-mutating-assign */

import { useEffect } from 'react'
import { DropzoneOptions, DropzoneState, useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

import { CrudItem } from '@gravis-os/types'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import isEmpty from 'lodash/isEmpty'

import getFileMetaFromFile from './getFileMetaFromFile'
import { File } from './types'
import useFiles from './useFiles'

export interface UseMultiStorageDropzoneProps {
  attachToNewRecord?: boolean
  onUploaded?: (uploadedData: any) => void
  bucketName?: string
  dropzoneProps?: DropzoneOptions
  item?: CrudItem // The primary module instance (e.g. Product) instance, possibly undefined for a new product
  module: { table: { name } } // Product module
  name?: string
  setFormValue?: (value: any) => void
  setUpsertRowsValue?: (
    rows: Record<string, unknown>[]
  ) => Record<string, unknown>[]
  storageModule: { table: { name } } // ProductImage module
  storageRecords?: Record<string, unknown>[]
}

export type UseMultiStorageDropzone = (props: UseMultiStorageDropzoneProps) => {
  dropzone: DropzoneState
  dropzoneOptions: DropzoneOptions
  files: File[]
  onRemove: (file: File) => void
}

const useMultiStorageDropzone: UseMultiStorageDropzone = (props) => {
  const {
    attachToNewRecord = false,
    bucketName = 'public',
    dropzoneProps,
    item,
    module,
    name = '',
    setFormValue,
    setUpsertRowsValue,
    storageModule,
    storageRecords,
    onUploaded
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
  const { files, setFiles } = useFiles({ bucketName, items: foreignRecords })

  // Effects
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      // eslint-disable-next-line fp/no-loops
      for (const file of files) URL.revokeObjectURL(file.url)
    }
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

      if (uploadedFileMetas.length === 0) return

      // If uploaded successfully, prepare to save the S3 keys to db
      const defaultForeignTableRows = uploadedFileMetas.map(
        (uploadedFileMeta, i) => {
          const savedFileKey = uploadedFileMeta.data.Key
          const file = files[i]
          return {
            alt: file.name,
            name: file.name,
            position: file.position || 0,
            size: file.size,
            src: savedFileKey,
            type: file.type
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
            workspace_id: primaryRecord.workspace_id
          })
        }))
      )

      return savedRows
    } catch (error) {
      toast.error('Error')
      console.error('Error caught:', error)
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

      if (onUploaded) onUploaded(uploaded)

      toast.success('Success')
    } catch (error) {
      console.error('Error caught:', error)
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
    } catch (error) {
      toast.error('Error')
      console.error('Error caught:', error)
    }
  }

  // Init Dropzone
  const dropzoneOptions = {
    accept: {
      'application/msword': ['.doc'],
      'application/pdf': ['.pdf'],
      'application/rtf': ['.rtf'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.oasis.opendocument.text': ['.odt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        ['.pptx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx'
      ],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
      'image/avif': ['.avif'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/svg+xml': ['.svg'],
      'image/webp': ['.webp'],
      'text/csv': ['.csv']
    } as DropzoneOptions['accept'],
    onDrop: handleDrop,
    ...dropzoneProps
  }
  const dropzone = useDropzone(dropzoneOptions)

  return {
    dropzone,
    dropzoneOptions,
    files,
    onRemove: handleRemove,
    onUpload: handleUpload,
    setFiles
  }
}

export default useMultiStorageDropzone
