import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react'

import { Avatar, AvatarProps, Button, IconButton, Stack } from '@gravis-os/ui'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { SupabaseClient, supabaseClient } from '@supabase/auth-helpers-nextjs'
import download from 'downloadjs'
import startCase from 'lodash/startCase'

import FieldLabel from './FieldLabel'
import getFileMetaFromFile from './getFileMetaFromFile'
import { cleanPath } from './utils'

export interface StorageAvatarWithUploadProps extends AvatarProps {
  alt?: string
  altKey?: string
  bucketName?: string
  client?: SupabaseClient
  disableLabel?: boolean
  disablePublic?: boolean
  editable?: boolean // Whether the image has upload capabilities
  fallbackSrc?: string // fallback image src
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  item?: any // The database record to save the image key to
  label?: string
  module?: any
  name?: string // The database key to save this src to
  onUpload?: (savedFilePath: string) => void
  size?: number // Image size
  src?: string // defaultValue to render the image. Storage filepath where image is currently stored
  value?: string // Typically the form value
}

const StorageAvatarWithUpload: React.FC<StorageAvatarWithUploadProps> = (
  props
) => {
  const {
    alt,
    altKey: injectedAltKey,
    bucketName: injectedBucketName,
    client = supabaseClient,
    disableLabel,
    disablePublic = false,
    editable,
    fallbackSrc,
    inputProps,
    item,
    label: injectedLabel,
    module,
    name = 'avatar_src',
    onUpload,
    size = 64,
    src: injectedFilePath,
    sx,
    value,
    ...rest
  } = props
  const { src } = props
  const bucketName =
    injectedBucketName || (disablePublic ? 'private ' : 'public')

  // States
  const [savedFileInfo, setSavedFileInfo] = useState<any>()
  const [savedFilePath, setSavedFilePath] = useState(injectedFilePath || value)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  // Update state when defaultValue changes
  useEffect(() => {
    setSavedFilePath(injectedFilePath || value)
  }, [injectedFilePath, value])

  const fetchDownloadImage = async (path) => {
    try {
      const { data, error } = await client.storage
        .from(bucketName)
        .download(cleanPath(path, bucketName))
      if (error || !data) throw error
      const url = URL.createObjectURL(data)
      if (url) setAvatarUrl(url)
    } catch (error) {
      console.error('Error downloading image:', error.message)
    }
  }

  // Download image when src exists
  useEffect(() => {
    if (savedFilePath) fetchDownloadImage(savedFilePath)
  }, [savedFilePath, value])

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select a file to upload.')
      }

      const file = event.target.files[0]
      const fileMeta = getFileMetaFromFile(file, module.table.name)
      const { filePath } = fileMeta

      const { data, error: uploadError } = await client.storage
        .from(bucketName)
        .upload(filePath, file)

      if (uploadError || !data) throw uploadError

      const savedFileKey = data.Key

      setSavedFileInfo(fileMeta)
      setSavedFilePath(savedFileKey)

      if (onUpload) onUpload(savedFileKey)

      // If item, autoSave to DB
      if (item) {
        const altKey = injectedAltKey || name.replace('_src', '_alt')
        await client
          .from(module.table.name)
          .update([{ [altKey]: file.name, [name]: savedFileKey }])
          .match({ [module.sk]: item[module.sk] })
      }
    } catch (error) {
      console.error('Error at StorageAvatarWithUpload', error.message)
    } finally {
      setUploading(false)
    }
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Document
  const isDocument = Boolean(src?.endsWith('.pdf'))
  const hasDocument = isDocument && avatarUrl
  const documentAlt = item?.[`${name}_alt`] || alt || 'Document'
  if (hasDocument) {
    return (
      <Stack alignItems="center" direction="row" spacing={1}>
        <Button
          fullWidth
          onClick={() => download(avatarUrl)}
          variant="outlined"
        >
          {documentAlt}
        </Button>
        <IconButton onClick={() => setAvatarUrl('')}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Stack>
    )
  }

  const label = injectedLabel || startCase(name)
  // Disable label for `avatar_src` keys by default
  const hasLabel = !disableLabel && label !== 'Avatar' && label !== 'Avatar Src'

  return (
    <div>
      {/* Label */}
      {hasLabel && <FieldLabel>{label}</FieldLabel>}

      <Avatar
        alt={alt || (avatarUrl ? 'Avatar' : 'No image')}
        onClick={() => {
          if (!fileInputRef.current || !editable) return
          fileInputRef.current.click()
        }}
        size={size}
        src={avatarUrl || fallbackSrc}
        sx={{
          // Color
          backgroundColor: 'transparent',
          borderColor: avatarUrl ? 'transparent' : 'primary.main',
          borderStyle: avatarUrl ? 'solid' : 'dashed',
          borderWidth: '1px',
          color: 'primary.main',

          ...(editable && {
            '&:after': {
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              bottom: 0,
              color: 'common.white',
              content: '"Upload"',
              display: 'flex',
              fontSize: 'body2.fontSize',
              fontWeight: 'bold',
              justifyContent: 'center',
              left: 0,
              opacity: 0,
              position: 'absolute',
              right: 0,
              top: 0,
              transition: 'opacity 0.3s ease',
            },

            '&:hover': {
              '&:after': { opacity: 1 },
              cursor: 'pointer',
            },
          }),

          ...sx,
        }}
        {...rest}
      >
        {editable && <AddOutlinedIcon />}
      </Avatar>

      <input
        accept="image/*"
        disabled={uploading}
        hidden
        id="single"
        onChange={uploadAvatar}
        ref={fileInputRef}
        type="file"
        {...inputProps}
      />
    </div>
  )
}

export default StorageAvatarWithUpload
