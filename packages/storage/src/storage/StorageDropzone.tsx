import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import type { DropzoneOptions } from 'react-dropzone'
import startCase from 'lodash/startCase'
import toast from 'react-hot-toast'
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { ConfirmationDialog, Link } from '@gravis-os/ui'
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import {
  supabaseClient,
  SupabaseClient,
} from '@supabase/supabase-auth-helpers/nextjs'
import getFileMetaFromFile from './getFileMetaFromFile'
import bytesToSize from './bytesToSize'
import useFiles, { File } from './useFiles'
import downloadFromBlobUrl from './downloadFromBlobUrl'

interface DropzoneProps {
  name: string // The field name
  label?: string // The field label
  files?: File[]
  onRemove?: (file: File) => void
  onUpload?: (files: File[]) => Promise<any>
  dropzoneProps: DropzoneOptions
}

const Dropzone: React.FC<DropzoneProps> = (props) => {
  const {
    files = [],
    name,
    label,
    onRemove,
    onUpload,
    dropzoneProps = {},
  } = props

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...dropzoneProps,
  })

  const { maxFiles } = dropzoneProps

  return (
    <div>
      <Box
        sx={{
          alignItems: 'center',
          border: 1,
          borderRadius: 1,
          borderStyle: 'dashed',
          borderColor: 'divider',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          outline: 'none',
          p: 6,
          ...(isDragActive && {
            backgroundColor: 'action.active',
            opacity: 0.5,
          }),
          '&:hover': {
            backgroundColor: 'action.hover',
            cursor: 'pointer',
            opacity: 0.5,
          },
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            '& img': {
              width: 100,
            },
          }}
        >
          {/* TODO@Joel: Move this SVG into the lib */}
          <img alt="Select file" src="/static/undraw_add_file2_gvbb.svg" />
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">{`Select ${startCase(
            label || name
          )}`}</Typography>
          <Typography variant="body1">
            {`Drop file${maxFiles && maxFiles === 1 ? '' : 's'}`} or{' '}
            <Link underline="always">browse</Link> through your machine
          </Typography>
        </Box>
      </Box>
      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <List>
            {files.map((file) => {
              const { path, name, size, type, url, alt }: File = file
              const handleDownloadClick = async () => downloadFromBlobUrl(file)
              return (
                <ListItem
                  key={path}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    '& + &': {
                      mt: 1,
                    },
                  }}
                >
                  {type?.startsWith('image') ? (
                    <ListItemAvatar>
                      <Avatar
                        variant="square"
                        src={url}
                        alt={alt || name}
                        onClick={handleDownloadClick}
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                      />
                    </ListItemAvatar>
                  ) : (
                    <ListItemIcon>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                  )}
                  <ListItemText
                    primary={
                      <Link pointer onClick={handleDownloadClick}>
                        {name || alt}
                      </Link>
                    }
                    primaryTypographyProps={{
                      color: 'textPrimary',
                      variant: 'subtitle2',
                    }}
                    secondary={bytesToSize(size)}
                  />
                  <ConfirmationDialog
                    onConfirm={() => onRemove?.(file)}
                    icon={<CloseOutlinedIcon fontSize="small" />}
                    tooltip="Delete"
                  />
                </ListItem>
              )
            })}
          </List>
        </Box>
      )}
    </div>
  )
}

export interface StorageDropzoneProps extends DropzoneProps {
  item?: Record<string, any> // Product instance, possibly undefined for a new product
  module: { table: { name } }
  storageModule: { table: { name } }
  client?: SupabaseClient
}

const StorageDropzone: React.FC<StorageDropzoneProps> = (props) => {
  const {
    client = supabaseClient,
    name, // 'gallery_images
    item, // product
    module, // e.g. product
    storageModule, // product_gallery_images
    dropzoneProps,
    ...rest
  } = props

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
        return client.storage.from('public').upload(filePath, file)
      })

      const uploadedFileMetas = await Promise.all(fileUploadPromises)

      if (!uploadedFileMetas.length) return

      // If uploaded successfully, save the s3 key to DB
      const foreignTableRows = uploadedFileMetas.map((uploadedFileMeta, i) => {
        const savedFileKey = uploadedFileMeta.data.Key
        const file = files[i]
        return {
          src: savedFileKey,
          alt: file.name,
          name: file.name,
          size: file.size,
          type: file.type,
          [`${primaryTableName}_id`]: primaryRecord.id, // The relation_id e.g. product_id,
        }
      })

      const savedRows = await client
        .from(foreignTableName)
        .upsert(foreignTableRows)

      toast.success('Success')

      return savedRows
    } catch (err) {
      console.error('Error caught:', err)
      toast.success('Error')
    }
  }
  const handleDrop = async (newFiles: File[]): Promise<any> => {
    try {
      // Upload files on drop
      const { data: uploadedFiles } = await handleUpload(newFiles)

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
      const { data, error } = await client.storage
        .from('public')
        .remove([file.src])

      if (error) throw new Error('Error removing image')

      // Remove from database
      await client.from(foreignTableName).delete().match({ id: file.id })

      // Remove from UI
      setFiles((prevFiles) =>
        prevFiles.filter((prevFile) => prevFile.url !== file.url)
      )
    } catch (err) {
      console.error('Error caught:', err)
      toast.error('Error')
    }
  }

  return (
    <Dropzone
      name={name}
      files={files}
      dropzoneProps={{
        accept:
          'image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf' as unknown as DropzoneOptions['accept'],
        onDrop: handleDrop,
        ...dropzoneProps,
      }}
      onUpload={handleUpload}
      onRemove={handleRemove}
      {...rest}
    />
  )
}

export default StorageDropzone
