import React from 'react'
import type { DropzoneOptions } from 'react-dropzone'
import startCase from 'lodash/startCase'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  Avatar,
  Box,
  Typography,
  BoxProps,
  ConfirmationDialog,
  Link,
} from '@gravis-os/ui'
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import bytesToSize from './bytesToSize'
import downloadFromBlobUrl from './downloadFromBlobUrl'
import useMultiStorageDropzone, {
  UseMultiStorageDropzoneProps,
} from './useMultiStorageDropzone'
import { File } from './types'
import FieldLabel from './FieldLabel'

export interface StorageFilesProps
  extends UseMultiStorageDropzoneProps,
    BoxProps {
  name: string // The field name
  dropzoneProps?: DropzoneOptions
  label?: string // The field label
  setValue?: (name: string, value: any) => void
}

const StorageFiles: React.FC<StorageFilesProps> = (props) => {
  const {
    name, // 'gallery_images
    item, // product
    module, // e.g. The primary table that stores these files e.g. `product`
    storageModule, // The foreign table where we save the images e.g. `product_gallery_images`
    dropzoneProps,
    label,
    setValue,
    ...rest
  } = props

  const { files, onRemove, dropzone, dropzoneOptions } =
    useMultiStorageDropzone({
      item,
      module,
      storageModule,
      setFormValue: (value) => setValue(name, value),
      dropzoneProps,
    })
  const { getRootProps, getInputProps, isDragActive } = dropzone
  const { maxFiles } = dropzoneOptions

  return (
    <Box {...rest}>
      {/* Label */}
      <FieldLabel>{label || startCase(name)}</FieldLabel>

      {/* Dropzone */}
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

      {/* Files */}
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
                    // TODO: Add ability to edit alt text
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
                    onConfirm={() => onRemove(file)}
                    icon={<CloseOutlinedIcon fontSize="small" />}
                    tooltip="Delete"
                  />
                </ListItem>
              )
            })}
          </List>
        </Box>
      )}
    </Box>
  )
}

export default StorageFiles
