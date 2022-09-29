import React, { useRef, useEffect, useState, InputHTMLAttributes } from 'react'
import { supabaseClient, SupabaseClient } from '@supabase/auth-helpers-nextjs'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Avatar, AvatarProps, Button, IconButton, Stack } from '@gravis-os/ui'
import download from 'downloadjs'
import startCase from 'lodash/startCase'
import getFileMetaFromFile from './getFileMetaFromFile'
import FieldLabel from './FieldLabel'

export interface StorageAvatarWithUploadProps extends AvatarProps {
  module?: any
  bucketName?: string
  client?: SupabaseClient
  onUpload?: (savedFilePath: string) => void
  src?: string // defaultValue to render the image. Storage filepath where image is currently stored
  size?: number // Image size
  value?: string // Typically the form value
  name?: string // The database key to save this src to
  item?: any // The database record to save the image key to
  editable?: boolean // Whether the image has upload capabilities
  alt?: string
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  label?: string
  disableLabel?: boolean
}

const StorageAvatarWithUpload: React.FC<StorageAvatarWithUploadProps> = (
  props
) => {
  const {
    name = 'avatar_src',
    src: injectedFilePath,
    size = 64,
    inputProps,
    onUpload,
    client = supabaseClient,
    bucketName = 'public',
    module,
    value,
    item,
    editable,
    alt,
    sx,
    label: injectedLabel,
    disableLabel,
    ...rest
  } = props
  const { src } = props

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
        .download(path)
      if (error || !data) throw error
      const url = URL.createObjectURL(data)
      if (url) setAvatarUrl(url)
    } catch (error) {
      console.error('Error downloading image: ', error.message)
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
        const altKey = name.replace('_src', '_alt')
        await client
          .from(module.table.name)
          .update([{ [name]: savedFileKey, [altKey]: file.name }])
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
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => download(avatarUrl)}
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
        src={avatarUrl}
        alt={alt || (avatarUrl ? 'Avatar' : 'No image')}
        onClick={() => {
          if (!fileInputRef.current || !editable) return
          fileInputRef.current.click()
        }}
        size={size}
        sx={{
          // Color
          backgroundColor: 'transparent',
          borderWidth: '1px',
          color: 'primary.main',
          borderStyle: avatarUrl ? 'solid' : 'dashed',
          borderColor: avatarUrl ? 'transparent' : 'primary.main',

          ...(editable && {
            '&:hover': {
              cursor: 'pointer',
              '&:after': { opacity: 1 },
            },

            '&:after': {
              content: '"Upload"',
              fontSize: 'body2.fontSize',
              fontWeight: 'bold',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'common.white',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              opacity: 0,
              transition: 'opacity 0.3s ease',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }),

          ...sx,
        }}
        {...rest}
      >
        {editable && <AddOutlinedIcon />}
      </Avatar>

      <input
        ref={fileInputRef}
        type="file"
        id="single"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
        hidden
        {...inputProps}
      />
    </div>
  )
}

export default StorageAvatarWithUpload
