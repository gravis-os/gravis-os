import type { DropzoneOptions } from 'react-dropzone'

import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

import {
  Avatar,
  Box,
  BoxProps,
  ConfirmationDialog,
  Sortable,
  SortableLayout,
  Stack,
  Typography,
} from '@gravis-os/ui'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import startCase from 'lodash/startCase'

import FieldLabel from './FieldLabel'
import useMultiStorageDropzone, {
  UseMultiStorageDropzoneProps,
} from './useMultiStorageDropzone'

const StorageGalleryAvatar = (props) => {
  const {
    active,
    dragProps,
    hidden = false,
    item,
    onRemove,
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
        size={size}
        src={url || src}
        {...dragProps}
        {...rest}
      />

      {!active && onRemove && !hidden && (
        <ConfirmationDialog
          buttonProps={{
            sx: {
              '&:hover': { color: 'error.main', display: 'block' },
              position: 'absolute',
              right: 0,
              top: 0,
            },
          }}
          icon={<CancelOutlinedIcon fontSize="small" />}
          onConfirm={() => onRemove(item)}
          tooltip="Delete"
        />
      )}
    </Box>
  )
}

export interface StorageGalleryProps
  extends Omit<UseMultiStorageDropzoneProps, 'setFormValue'>,
    BoxProps {
  dropzoneProps?: DropzoneOptions
  hidden?: boolean
  label?: string // The field label
  name: string // The field name
  setValue?: UseFormReturn['setValue']
}

const StorageGallery: React.FC<StorageGalleryProps> = (props) => {
  const {
    dropzoneProps,
    hidden = false,
    item, // product
    label,
    module, // e.g. The primary table that stores these files e.g. `product`
    name, // 'gallery_images
    setValue,
    storageModule, // The foreign table where we save the images e.g. `product_gallery_images`
    storageRecords,
    ...rest
  } = props

  const { dropzone, dropzoneOptions, files, onRemove } =
    useMultiStorageDropzone({
      dropzoneProps,
      item,
      module,
      setFormValue: (value) => setValue(name, value, { shouldDirty: true }),
      storageModule,
      storageRecords,
    })
  const { getInputProps, getRootProps, isDragActive } = dropzone
  const { maxFiles } = dropzoneOptions
  const hasFiles = files.length > 0

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

      <Stack alignItems="flex-start" direction="row" spacing={avatarSpacing}>
        {/* Sortable Files */}
        {hasFiles && (
          <Box
            sx={{
              '&::-webkit-scrollbar': {
                background: 'transparent',
                width: 0,
              },
              overflowX: 'scroll',
              overflowY: 'hidden',
            }}
          >
            <Sortable
              items={files as any}
              layout={SortableLayout.Horizontal}
              renderItem={({ onRemove: onRemoveSortableItem, ...rest }) => (
                <StorageGalleryAvatar
                  hidden={hidden}
                  onRemove={async (item) => {
                    // Remove from db
                    if (item) await onRemove(item)
                    // Remove from ui
                    onRemoveSortableItem()
                  }}
                  size={avatarSize}
                  {...rest}
                />
              )}
              setSortKeys={setSortKeys}
              sortKeys={sortKeys}
              spacing={avatarSpacing}
            />
          </Box>
        )}

        {!hasFiles && hidden && (
          <Box>
            <Typography>No images</Typography>
          </Box>
        )}

        {/* Dropzone Upload */}
        {!hidden && (
          <Avatar
            size={avatarSize}
            sx={{
              '&:active': { backgroundColor: 'background.default' },
              '&:hover': {
                borderColor: 'primary.main',
                borderStyle: 'solid',
                cursor: 'pointer',
              },
              backgroundColor: 'transparent',
              border: '1px dashed',
              borderColor: 'divider',
              color: 'primary.main',
              ...(isDragActive && {
                borderColor: 'primary.main',
                borderStyle: 'solid',
              }),
            }}
            variant="rounded"
            {...getRootProps()}
          >
            <Box sx={{ textAlign: 'center' }}>
              <AddCircleOutlineOutlinedIcon />
              <Typography color="primary.main" variant="subtitle2">
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
