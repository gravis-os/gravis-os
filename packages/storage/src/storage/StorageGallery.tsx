import React, { useEffect, useState } from 'react'
import type { DropzoneOptions } from 'react-dropzone'
import startCase from 'lodash/startCase'
import {
  Box,
  Typography,
  Avatar,
  BoxProps,
  ConfirmationDialog,
  Sortable,
  SortableLayout,
  Stack,
} from '@gravis-os/ui'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import useMultiStorageDropzone, {
  UseMultiStorageDropzoneProps,
} from './useMultiStorageDropzone'
import FieldLabel from './FieldLabel'

const StorageGalleryAvatar = (props) => {
  const {
    active,
    onRemove,
    hidden = false,
    item,
    dragProps,
    size = 60,
    ...rest
  } = props
  const { title, src, url } = item || {}

  return (
    <Box
      sx={{
        '& .MuiIconButton-root': {
          visibility: 'hidden',
        },
        '&:hover .MuiIconButton-root': {
          visibility: 'visible',
        },
      }}
    >
      <Avatar
        alt={title}
        src={url || src}
        size={size}
        {...dragProps}
        {...rest}
      />

      {!active && onRemove && !hidden && (
        <ConfirmationDialog
          onConfirm={() => onRemove(item)}
          icon={<CancelOutlinedIcon fontSize="small" />}
          tooltip="Delete"
          buttonProps={{
            sx: {
              position: 'absolute',
              top: 0,
              right: 0,
              '&:hover': { display: 'block', color: 'error.main' },
            },
          }}
        />
      )}
    </Box>
  )
}

export interface StorageGalleryProps
  extends Omit<UseMultiStorageDropzoneProps, 'setFormValue'>,
    BoxProps {
  name: string // The field name
  dropzoneProps?: DropzoneOptions
  label?: string // The field label
  setValue?: (name: string, value: unknown) => void
  hidden?: boolean
}

const StorageGallery: React.FC<StorageGalleryProps> = (props) => {
  const {
    name, // 'gallery_images
    item, // product
    module, // e.g. The primary table that stores these files e.g. `product`
    storageModule, // The foreign table where we save the images e.g. `product_gallery_images`
    storageRecords,
    dropzoneProps,
    label,
    setValue,
    hidden = false,
    ...rest
  } = props

  const { files, onRemove, dropzone, dropzoneOptions } =
    useMultiStorageDropzone({
      item,
      storageRecords,
      module,
      storageModule,
      setFormValue: (value) => setValue(name, value),
      dropzoneProps,
    })
  const { getRootProps, getInputProps, isDragActive } = dropzone
  const { maxFiles } = dropzoneOptions
  const hasFiles = Boolean(files.length)

  // TODO: Handle sorting and repositioning in DB
  const [sortKeys, setSortKeys] = useState(() => files.map(({ id }) => id))
  useEffect(() => {
    if (files) setSortKeys(files.map(({ id }) => id))
  }, [files])

  // Styles
  const avatarSize = 110
  const avatarSpacing = 1

  return (
    <Box {...rest}>
      {/* Label */}
      <FieldLabel>{label || startCase(name)}</FieldLabel>

      <Stack direction="row" alignItems="flex-start" spacing={avatarSpacing}>
        {/* Sortable Files */}
        {hasFiles && (
          <Box
            sx={{
              overflowY: 'hidden',
              overflowX: 'scroll',
              '&::-webkit-scrollbar': {
                width: 0,
                background: 'transparent',
              },
            }}
          >
            <Sortable
              layout={SortableLayout.Horizontal}
              spacing={avatarSpacing}
              sortKeys={sortKeys}
              setSortKeys={setSortKeys}
              items={files as any}
              renderItem={({ onRemove: onRemoveSortableItem, ...rest }) => (
                <StorageGalleryAvatar
                  size={avatarSize}
                  hidden={hidden}
                  onRemove={async (item) => {
                    // Remove from db
                    if (item) await onRemove(item)
                    // Remove from ui
                    onRemoveSortableItem()
                  }}
                  {...rest}
                />
              )}
            />
          </Box>
        )}

        {/* Dropzone Upload */}
        {!hidden && (
          <Avatar
            size={avatarSize}
            variant="rounded"
            sx={{
              border: '1px dashed',
              borderColor: 'divider',
              backgroundColor: 'transparent',
              color: 'primary.main',
              '&:hover': {
                cursor: 'pointer',
                borderColor: 'primary.main',
                borderStyle: 'solid',
              },
              '&:active': { backgroundColor: 'background.default' },
              ...(isDragActive && {
                borderColor: 'primary.main',
                borderStyle: 'solid',
              }),
            }}
            {...getRootProps()}
          >
            <Box sx={{ textAlign: 'center' }}>
              <AddCircleOutlineOutlinedIcon />
              <Typography variant="subtitle2" color="primary.main">
                {isDragActive ? 'Upload Photo' : 'Add Photo'}
                {maxFiles && maxFiles === 1 ? '' : 's'}
              </Typography>
            </Box>
            <input {...getInputProps()} />
          </Avatar>
        )}
      </Stack>
    </Box>
  )
}

export default StorageGallery
