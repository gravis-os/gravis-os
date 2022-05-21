import { useEffect } from 'react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import toast from 'react-hot-toast'
import { DropzoneOptions } from 'react-dropzone'
import getFileMetaFromFile from './getFileMetaFromFile'
import useFiles from './useFiles'
import { File } from './types'

export interface UseStorageDropzoneProps {
  item?: Record<string, any> // The primary module instance (e.g. Product) instance, possibly undefined for a new product
  module: { table: { name } } // Product module
  storageModule: { table: { name } } // ProductImage module
}

export type UseStorageDropzone = (props: UseStorageDropzoneProps) => {
  files?: File[]
  onRemove?: (file: File) => void
  dropzoneProps: DropzoneOptions
}

const useStorageDropzone: UseStorageDropzone = (props) => {
  const { item, module, storageModule } = props

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

      // If uploaded successfully, save the s3 key to DB
      const foreignTableRows = uploadedFileMetas.map((uploadedFileMeta, i) => {
        const savedFileKey = uploadedFileMeta.data.Key
        const file = files[i]
        return {
          [`${primaryTableName}_id`]: primaryRecord.id, // The relation_id e.g. product_id,
          src: savedFileKey,
          alt: file.name,
          name: file.name,
          size: file.size,
          type: file.type,
          // TODO: Add position here to sort the images
        }
      })

      const savedRows = await supabaseClient
        .from(foreignTableName)
        .upsert(foreignTableRows)

      return savedRows
    } catch (err) {
      toast.error('Error')
      console.error('Error caught:', err)
    }
  }
  const handleDrop = async (newFiles: File[]): Promise<any> => {
    try {
      // Upload files on drop
      const uploaded = await handleUpload(newFiles)

      if (!uploaded) return

      // Set UI after upload success
      setFiles((prevFiles) =>
        [...prevFiles, ...newFiles].map((file, i) => {
          const { id } = file

          // Already existing file (this wasn't just uploaded)
          if (file.url) return file

          // If the file is new, return the new file with the id
          return Object.assign(file, { url: URL.createObjectURL(file), id })
        })
      )

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
    } catch (err) {
      toast.error('Error')
      console.error('Error caught:', err)
    }
  }

  return {
    files,
    setFiles,
    onUpload: handleUpload,
    onRemove: handleRemove,
    dropzoneProps: {
      accept:
        'image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf' as unknown as DropzoneOptions['accept'],
      onDrop: handleDrop,
    },
  }
}

export default useStorageDropzone
