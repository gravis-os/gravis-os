import { useEffect } from 'react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import toast from 'react-hot-toast'
import { DropzoneOptions, DropzoneState, useDropzone } from 'react-dropzone'
import getFileMetaFromFile from './getFileMetaFromFile'
import useFiles from './useFiles'
import { File } from './types'

export interface UseMultiStorageDropzoneProps {
  item?: Record<string, any> // The primary module instance (e.g. Product) instance, possibly undefined for a new product
  module: { table: { name } } // Product module
  storageModule: { table: { name } } // ProductImage module
  setFormValue: (value: any) => void
  dropzoneProps?: DropzoneOptions
}

export type UseMultiStorageDropzone = (props: UseMultiStorageDropzoneProps) => {
  files: File[]
  onRemove: (file: File) => void
  dropzone: DropzoneState
  dropzoneOptions: DropzoneOptions
}

const useMultiStorageDropzone: UseMultiStorageDropzone = (props) => {
  const { item, module, storageModule, setFormValue, dropzoneProps } = props

  // Vars
  const primaryTableName = module.table.name // Base model e.g. `product`
  const foreignTableName = storageModule.table.name // Has Many e.g. `product_image`
  const primaryRecord = item // `product` instance
  const foreignRecords = item?.[foreignTableName] // `product_image` instances

  // State
  const { files, setFiles } = useFiles({ items: foreignRecords })

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
        return supabaseClient.storage.from('public').upload(filePath, file)
      })

      const uploadedFileMetas = await Promise.all(fileUploadPromises)

      if (!uploadedFileMetas.length) return

      // If uploaded successfully, prepare to save the S3 keys to db
      const foreignTableRows = uploadedFileMetas.map((uploadedFileMeta, i) => {
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
      })

      // This is a new item, defer db saving action instead by storing in the form value
      if (!primaryRecord) {
        setFormValue(foreignTableRows)
        return foreignTableRows
      }

      // Save to DB
      const savedRows = await supabaseClient.from(foreignTableName).upsert(
        foreignTableRows.map((row) => ({
          ...row,
          // The relation_id e.g. product_id
          [`${primaryTableName}_id`]: primaryRecord.id,
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

      // Set UI after upload success
      setFiles((prevFiles) => {
        // We need to assign instead of spread because we need to mount on the File class
        const newFilesWithId = newFiles.map((newFile, i) =>
          Object.assign(newFile, { id: uploaded.data[i].id })
        )
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
        .from('public')
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

      // Don't toast here because we let confirmation dialog handle toast for us
    } catch (err) {
      toast.error('Error')
      console.error('Error caught:', err)
    }
  }

  // Init Dropzone
  const dropzoneOptions = {
    accept:
      'image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf' as unknown as DropzoneOptions['accept'],
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
